import { useSQLiteContext } from 'expo-sqlite';

export type JLPTLevel = 'N5' | 'N4';

// Interface to manage question query
interface QuestionQuery {
	id: number;
	questionText: string;
	statementText: string;
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

// Interfaces for Backend and UI
export interface Question {
	id: number;
	text: string;
	statement: string;
	type: string;
	image: string | null;
	audio: string | null;
	contextualText: string | null;
	tags: string[];
	alternatives: string[];
	correctAlternative: number;
	date: Date | null;
	isCorrect: boolean | null,
}

// Common order params for SQL queries
enum Order {
	RANDOM = "RANDOM()",
	ASC = "id ASC",
	DESC = "id DESC",
	DATE = "answered_questions.answered_date DESC",
}

// Object to construct where clauses
class WhereClause {
	clauses: string[];
	values: Record<string, string | number>;
	level: JLPTLevel;

	constructor(level: JLPTLevel) {
		this.clauses = [];
		this.values = {};
		this.level = level;
	}

	addClause(table: string, column: string, value: string | number, condition: string = "=", isQuestionTable: boolean = true) : void {
		if(isQuestionTable)
			this.clauses.push(`${this.level}.${table}.${column} ${condition} $${table}${column}`);
		else
			this.clauses.push(`${table}.${column} ${condition} $${table}${column}`);
		this.values[`$${table}${column}`] = value;
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
		statement: result.statementText,
		type: result.questionType,
		alternatives: [result.alternative1, result.alternative2, result.alternative3, result.alternative4],
		correctAlternative: result.correctAlternative,
		image: image,
		audio: audio,
		contextualText: result.contextualText,
		tags: result?.tags ? result.tags.split(",") : [],
		date: result?.answeredDate ? new Date(result.answeredDate) : null,
		isCorrect: result.isCorrect,
	}

	return question;
}

export function useQuestions(level: JLPTLevel) {
	const db = useSQLiteContext();

	const queryBase = `
    SELECT
    ${level}.questions.id as id,  
    ${level}.questions.question_text as questionText,
    ${level}.questions.question_type as questionType,
    ${level}.media.image_file_path as imagePath,
    ${level}.media.audio_file_path as audioPath,
    ${level}.statement.statement_text as statementText,
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
	

	const selectQuestion = async (whereClause: WhereClause, order: Order = Order.RANDOM): Promise<Question | null> => {
		const question: Question[] = await selectQuestionMany(whereClause, order, 1);
		return (question.length > 0) ? question[0] : null;
	}

	const selectQuestionMany = async (whereClause: WhereClause, order: Order = Order.RANDOM, limit: number = 20): Promise<Question[]> => {
		const query = ((whereClause === null) ? `${queryBase}` : `${queryBase} WHERE ${whereClause.getClauses()}`)
			+ ` GROUP BY ${level}.questions.id ORDER BY ${order} LIMIT ${limit}`
		
		const results: QuestionQuery[] = await db.getAllAsync<QuestionQuery>(query, whereClause.getValues());

		const questions: Question[] = results.map((result) => formatQuestion(result, level));
		return questions;
	}

	const selectById = async (id: number): Promise<Question | null> => {
		const whereClause: WhereClause = new WhereClause(level);
		whereClause.addClause("questions", "id", id);
		return await selectQuestion(whereClause);
	}

	const selectByTagName = async (tagName: string, limit: number = 5): Promise<Question[]> => {
		const whereClause: WhereClause = new WhereClause(level);
		whereClause.addClause("tags", "name", tagName);
		return await selectQuestionMany(whereClause, Order.RANDOM, limit);
	}

	const selectByType = async (type: string): Promise<Question | null> => {
		const whereClause: WhereClause = new WhereClause(level);
		whereClause.addClause("questions", "question_type", type);
		return await selectQuestion(whereClause);
	}

	const selectByTypeMany = async (type: string, limit: number = 5): Promise<Question[]> => {
		const whereClause: WhereClause = new WhereClause(level);
		whereClause.addClause("questions", "question_type", type);
		return await selectQuestionMany(whereClause, Order.ASC, limit);
	}

	return {
		selectById, selectByTagName, selectByType, selectByTypeMany
	};
}