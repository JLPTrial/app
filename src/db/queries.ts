import { JLPTLevel, Question } from '@/types/types';
import { useSQLiteContext } from 'expo-sqlite';

export type AnsweredStatus = 'answered' | 'unanswered' | 'all';

// For now, has no utility beside telling the whereClause to 
// not use JLPTLevel database.
const UserDB = "UserDB";

// Interface to manage question query
interface QuestionQuery {
  id: number;
  questionText: string;
  questionCommand: string;
  questionType: string;
  imagePath: string | null;
  audioPath: string | null;
  contextualText: string | null;
  alternativeId: number;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  tags: string;
  correctAlternative: number;
  answeredDate: string | null;
  isCorrect: boolean | null,
}

// Common order params for SQL queries
enum Order {
  RANDOM = "RANDOM()",
  ASC = "id ASC",
  DESC = "id DESC",
  DATE = "answered_questions.answered_date DESC",
}

// Common comparison params for SQL queries
enum Compare {
  EQUAL = "=",
  DIFF = "!=",
  LESS = "<",
  LESS_EQ = "<=",
  MORE = ">",
  MORE_EQ = ">=",
}

// Object to construct where clauses
class WhereClause {
  clauses: string[];
  values: Record<string, string | number>;
  level: JLPTLevel;
  numClauses: number = 0;

  constructor(level: JLPTLevel) {
    this.clauses = [];
    this.values = {};
    this.level = level;
  }

  addClauseCompare(table: string, column: string, value: string | number | Date, comparison: Compare = Compare.EQUAL, database?: string | undefined): void {
    const field = ((database === undefined) ? `${this.level}.` : "") + `${table}.${column}`;
    const key = `${field}.${this.numClauses}`.replaceAll(".", "");
    this.clauses.push(`${field} ${comparison} $${key}`);
    this.setValue(key, value);
  }

  addClauseIsNull(table: string, column: string, isNull: boolean = true, database: string | undefined): void {
    const field = ((database === undefined) ? `${this.level}.` : "") + `${table}.${column}`;
    this.clauses.push(`${field} is ${(isNull) ? 'NULL' : 'NOT NULL'}`);
  }

  addClauseIn(table: string, column: string, values: (string | number)[], database?: string | undefined): void {
    if (values.length === 0) return;

    const field = ((database === undefined) ? `${this.level}.` : "") + `${table}.${column}`;

    const keys = values.map((_, index) => {
      const key = `${field}${this.numClauses}${index}`.replaceAll(".", "");
      return `$${key}`;
    });

    this.clauses.push(`${field} IN (${keys.join(", ")})`);

    values.forEach((val, index) => {
      this.values[`$${keys[index]}`] = val;
    });

    this.numClauses += 1;
  }

  setValue(key: string, value: string | number | Date): void {
    if (value instanceof Date)
      value = value.toISOString().replace("T", " ").split(".")[0];
    this.values[`$${key}`] = value;
    this.numClauses += 1;
  }

  getClauses(): string {
    return this.clauses.join(" AND ");
  }

  getValues(): Record<string, string | number> {
    return this.values;
  }
}

const formatQuestion = (result: QuestionQuery, level: JLPTLevel) => {
  const image = (result.imagePath != null) ? `${level}${result.imagePath}` : null;
  const audio = (result.audioPath != null) ? `${level}${result.audioPath}` : null;

  const question: Question = {
    id: result.id,
    text: result.questionText,
    command: result.questionCommand,
    type: result.questionType,
    alternatives: [result.alternative1, result.alternative2, result.alternative3, result.alternative4],
    correctAlternative: result.correctAlternative,
    image: image,
    audio: audio,
    contextualText: result.contextualText,
    tags: result?.tags ? result.tags.split(",") : [],
    date: result?.answeredDate ? new Date(result.answeredDate) : null,
    isCorrect: result.isCorrect,
  };

  return question;
};

export function useQuestions(level: JLPTLevel) {
  const db = useSQLiteContext();

  const queryBase = `
    SELECT
    ${level}.questions.id as id,  
    ${level}.questions.question_text as questionText,
    ${level}.questions.question_type as questionType,
    ${level}.media.image_file_path as imagePath,
    ${level}.media.audio_file_path as audioPath,
    ${level}.statement.question_command as questionCommand,
    ${level}.contextual_texts.contextual_text as contextualText,
    ${level}.alternatives.id as alternativeId,
    ${level}.alternatives.alternative_1 as alternative1,
    ${level}.alternatives.alternative_2 as alternative2,
    ${level}.alternatives.alternative_3 as alternative3,
    ${level}.alternatives.alternative_4 as alternative4,
    ${level}.alternatives.correct_alternative as correctAlternative,
	answered_questions.answered_date as answeredDate,
	answered_questions.is_correct as isCorrect,
    GROUP_CONCAT(DISTINCT ${level}.tags.name) as tags
    FROM ${level}.questions
      INNER JOIN ${level}.alternatives
        ON ${level}.questions.alternative_id = ${level}.alternatives.id 
      LEFT JOIN ${level}.media
        ON ${level}.questions.media_id = ${level}.media.id
      INNER JOIN ${level}.statement
        ON ${level}.questions.statement_id = ${level}.statement.id 
      LEFT JOIN ${level}.contextual_texts
        ON ${level}.media.contextual_text_id = ${level}.contextual_texts.id
      LEFT JOIN ${level}.question_tags
        ON  ${level}.questions.id = ${level}.question_tags.question_id
      LEFT JOIN ${level}.tags
        ON ${level}.question_tags.tag_id = ${level}.tags.id
	  LEFT JOIN answered_questions
		ON ${level}.questions.id = answered_questions.question_id
		AND answered_questions.jlpt_level = '${level}'`;


  const selectQuestion = async (whereClause?: WhereClause, order: Order = Order.RANDOM): Promise<Question | null> => {
    const question: Question[] = await selectQuestionMany(whereClause, order, 1);
    return (question.length > 0) ? question[0] : null;
  };

  const selectQuestionMany = async (whereClause?: WhereClause, order: Order = Order.RANDOM, limit: number = -1): Promise<Question[]> => {
    const query = ((whereClause === undefined) ? `${queryBase}` : `${queryBase} WHERE ${whereClause.getClauses()}`)
      + ` GROUP BY ${level}.questions.id ORDER BY ${order} LIMIT ${limit}`;

    const values = ((whereClause === undefined) ? {} : whereClause.getValues());
    const results: QuestionQuery[] = await db.getAllAsync<QuestionQuery>(query, values);
    const questions: Question[] = results.map((result) => formatQuestion(result, level));
    return questions;
  };

  const selectById = async (id: number): Promise<Question | null> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("questions", "id", id);
    return await selectQuestion(whereClause);
  };

  const selectByTagName = async (tagName: string, limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("tags", "name", tagName);
    return await selectQuestionMany(whereClause, Order.RANDOM, limit);
  };

  const selectByType = async (type: string): Promise<Question | null> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("questions", "question_type", type);
    return await selectQuestion(whereClause);
  };

  const selectTagsByType = async (type: string): Promise<string[]> => {
    const query = `
      SELECT DISTINCT ${level}.tags.name as name
      FROM ${level}.questions
      INNER JOIN ${level}.question_tags ON ${level}.questions.id = ${level}.question_tags.question_id
      INNER JOIN ${level}.tags ON ${level}.question_tags.tag_id = ${level}.tags.id
      WHERE ${level}.questions.question_type = $type
      ORDER BY ${level}.tags.name ASC
    `;
    const results = await db.getAllAsync<{ name: string }>(query, { $type: type });
    return results.map(r => r.name);
  };

  const selectByTypeMany = async (type: string, limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("questions", "question_type", type);
    return await selectQuestionMany(whereClause, Order.ASC, limit);
  };

  const insertAnswer = async (question: Question, level: JLPTLevel, answer: number): Promise<boolean> => {
    const query = `INSERT INTO answered_questions (jlpt_level, is_correct, question_id) VALUES (?,?,?)`;
    try {
      await db.runAsync(query, `${level}`, answer === question.correctAlternative, question.id);
      return true;
    } catch {
      return false;
    }
  };

  const selectAnsweredByDateMany = async (dateStart: Date, dateEnd: Date = new Date(), limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("answered_questions", "answered_date", dateStart, Compare.MORE_EQ, UserDB);
    whereClause.addClauseCompare("answered_questions", "answered_date", dateEnd, Compare.LESS_EQ, UserDB);
    return await selectQuestionMany(whereClause, Order.DATE, limit);
  };

  const selectAnsweredMany = async (limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseIsNull("answered_questions", "answered_date", false, UserDB);
    return await selectQuestionMany(whereClause, Order.DATE, limit);
  };

  const filterAnsweredByRight = (questions: Question[]): Question[] => {
    return questions.filter((question) => question.isCorrect === true);
  };

  const filterAnsweredByWrong = (questions: Question[]): Question[] => {
    return questions.filter((question) => question.isCorrect === false);
  };

  const searchQuestionsFilters = async (
    type: string,
    tags: string[] = [],
    answeredStatus: AnsweredStatus = 'unanswered',
    limit: number = -1,
    order: Order = Order.RANDOM): Promise<Question[]> => {

    const whereClause = new WhereClause(level);

    whereClause.addClauseCompare("questions", "question_type", type);

    if (tags.length > 0) whereClause.addClauseIn("tags", "name", tags);

    if (answeredStatus === 'answered') {
      whereClause.addClauseIsNull("answered_questions", "answered_date", false, UserDB);
    }
    else if (answeredStatus === 'unanswered') {
      whereClause.addClauseIsNull("answered_questions", "answered_date", true, UserDB);
    }

    return await selectQuestionMany(whereClause, order, limit);
  };

  return {
    selectById, selectByTagName, selectByType, selectTagsByType, selectByTypeMany, insertAnswer, selectAnsweredByDateMany,
    selectAnsweredMany, filterAnsweredByRight, filterAnsweredByWrong, searchQuestionsFilters
  };
}