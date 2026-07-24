import { ExamAttempt, ExamStats, JLPTLevel, Question } from '@/types/types';
import { calculateRightRatio } from '@/utils/formatStats';
import { useSQLiteContext } from 'expo-sqlite';

export type AnsweredStatus = 'answered' | 'unanswered' | 'all';

// Define prefix to access answers database
const UserDB = "main";

// Interface to manage question query
interface QuestionQuery {
  id: number;
  questionText: string;
  questionCommand: string;
  questionType: 'kanji' | 'vocabulary' | 'reading' | 'grammar' | 'listening';
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

  addClauseCompare(table: string, column: string, value: string | number | Date, comparison: Compare = Compare.EQUAL, database: JLPTLevel | string = this.level): void {
    const field = `${database}.${table}.${column}`;
    const key = `${field}.${this.numClauses}`.replaceAll(".", "");
    this.clauses.push(`${field} ${comparison} $${key}`);
    this.setValue(key, value);
  }

  addClauseIsNull(table: string, column: string, database: JLPTLevel | string = this.level, isNull = true): void {
    const field = `${database}.${table}.${column}`;
    this.clauses.push(`${field} is ${(isNull) ? 'NULL' : 'NOT NULL'}`);
  }

  addClauseIsNotNull(table: string, column: string, database: JLPTLevel | string = this.level): void {
    this.addClauseIsNull(table, column, database, false);
  }

  addClauseIn(table: string, column: string, values: (string | number)[], database = this.level): void {
    if (values.length === 0) return;

    const field = `${database}.${table}.${column}`;

    const keys = values.map((_, index) => {
      const key = `${field}${this.numClauses}${index}`.replaceAll(".", "");
      return `$${key}`;
    });

    this.clauses.push(`${field} IN (${keys.join(", ")})`);

    values.forEach((val, index) => {
      this.values[`${keys[index]}`] = val;
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
    alternatives: [result.alternative1, result.alternative2, result.alternative3, result.alternative4].filter((alternative) => alternative !== null),
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

  const queryBase = `SELECT
    ${level}.questions.id as id,  
    ${level}.questions.question_text as questionText,
    ${level}.questions.question_type as questionType,
    ${level}.media.image_file_path as imagePath,
    ${level}.media.audio_file_path as audioPath,
    ${level}.commands.question_command as questionCommand,
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
      INNER JOIN ${level}.commands
        ON ${level}.questions.command_id = ${level}.commands.id
      LEFT JOIN ${level}.contextual_texts
        ON ${level}.media.contextual_text_id = ${level}.contextual_texts.id
      LEFT JOIN ${level}.question_tags
        ON  ${level}.questions.id = ${level}.question_tags.question_id
      LEFT JOIN ${level}.tags
        ON ${level}.question_tags.tag_id = ${level}.tags.id
	  LEFT JOIN answered_questions
		ON ${level}.questions.id = answered_questions.question_id
		AND answered_questions.jlpt_level = '${level}'`;

  const selectQuestions = async (whereClause?: WhereClause, order: Order = Order.RANDOM, limit: number = -1): Promise<Question[]> => {

    const hasCondition = (whereClause !== undefined);

    const where = (hasCondition) ? `WHERE ${whereClause.getClauses()}` : ``;

    const query = `${queryBase} ${where} GROUP BY ${level}.questions.id ORDER BY ${order} LIMIT ${limit}`;

    const values = (hasCondition) ? whereClause.getValues() : {};

    const results: QuestionQuery[] = await db.getAllAsync<QuestionQuery>(query, values);

    const questions: Question[] = results.map((result) => formatQuestion(result, level));

    return questions;
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

  const selectAnsweredByDateMany = async (dateStart: Date, dateEnd: Date = new Date(), limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseCompare("answered_questions", "answered_date", dateStart, Compare.MORE_EQ, UserDB);
    whereClause.addClauseCompare("answered_questions", "answered_date", dateEnd, Compare.LESS_EQ, UserDB);
    return await selectQuestions(whereClause, Order.DATE, limit);
  };

  const selectAnsweredMany = async (limit: number = -1): Promise<Question[]> => {
    const whereClause: WhereClause = new WhereClause(level);
    whereClause.addClauseIsNotNull("answered_questions", "answered_date", UserDB);
    return await selectQuestions(whereClause, Order.DATE, limit);
  };

  const getTypeStats = async () => {
    const types = ['kanji', 'listening', 'reading', 'vocabulary', 'grammar'];
    const stats = new Array();
    for (let type of types) {
      const typeStats = await searchQuestionsFilters(type, [], 'answered');
      stats.push(calculateRightRatio(typeStats));
    }

    return stats;
  };

  const getTagStats = async (type: string) => {
    const tags = await selectTagsByType(type);
    const stats = new Array();
    for (let tag of tags) {
      const tagStats = await searchQuestionsFilters(type, [tag], 'answered');
      stats.push(calculateRightRatio(tagStats));
    }

    return [tags, stats];
  };

  const getAttemptStats = async (limit : number = 5) : Promise<ExamStats[] | null> => {
    const examAttempts : ExamAttempt[] | null = await selectExamsAttempts(limit, 'ASC');
    if(examAttempts === null){
      return null;
    }
    const stats: ExamStats[] = new Array();
    for (let attempt of examAttempts) {
      const answerRatio = 100 * (attempt.correct_answers / attempt.total_questions);

      if(attempt.finished_at === null){
        stats.push({approved: attempt.approved, score: answerRatio, duration : 0 });
        continue;
      }
      const durationMs = Number(attempt.finished_at) - Number(attempt.started_at);
      const durationMinutes = ((durationMs / 1000) / 60);

      stats.push({approved: attempt.approved, score: answerRatio, duration : durationMinutes });
    }

    return stats;
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
      whereClause.addClauseIsNotNull("answered_questions", "answered_date", UserDB);
    }
    else if (answeredStatus === 'unanswered') {
      whereClause.addClauseIsNull("answered_questions", "answered_date", UserDB);
    }

    return await selectQuestions(whereClause, order, limit);
  };

  const selectStatementId = async (
    statementText: string
  ): Promise<number | null> => {
    const query = `
      SELECT id
      FROM ${level}.commands
      WHERE question_command = $statementText
    `;

    const result = await db.getFirstAsync<{ id: number }>(
      query,
      { $statementText: statementText }
    );

    return result?.id ?? null;
  };

  const searchQuestionsByStatement = async (
    statementText: string,
    answeredStatus: AnsweredStatus = 'unanswered',
    limit: number = -1,
    order: Order = Order.RANDOM,
  ): Promise<Question[]> => {

    const statementId = await selectStatementId(statementText);

    if (statementId === null) {
      return [];
    }

    const whereClause = new WhereClause(level);

    whereClause.addClauseCompare(
      "questions",
      "command_id",
      statementId
    );

    if (answeredStatus === 'answered') {
      whereClause.addClauseIsNull(
        "answered_questions",
        "answered_date",
        UserDB,
        false
      );
    } else if (answeredStatus === 'unanswered') {
      whereClause.addClauseIsNull(
        "answered_questions",
        "answered_date",
        UserDB,
        true
      );
    }

    return await selectQuestions(whereClause, order, limit);
  };

  const selectExamsAttempts = async (limit : number = 1, order : string = 'DESC') : Promise<ExamAttempt[] | null> => {
    const query = `SELECT * FROM exam_attempts WHERE jlpt_level = '${level}' ORDER BY started_at ${order} LIMIT ${limit}`;

    try {
      const examAttempts : ExamAttempt[] | null = await db.getAllAsync(query);
      return examAttempts;
    } catch {
      return null;
    }

  };

  const selectLastExam = async () : Promise<ExamAttempt | null> => {
    const exam : ExamAttempt[] | null = await selectExamsAttempts();
    return (exam === null) ? null : exam[0];
  };

  return {
    selectTagsByType, selectAnsweredByDateMany, selectAnsweredMany,
    searchQuestionsFilters, searchQuestionsByStatement, selectLastExam,
    getTypeStats, getTagStats, getAttemptStats
  };
}