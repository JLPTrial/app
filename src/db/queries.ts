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
  alternatives: Alternative;
}

export interface Alternative {
  id: number;
  alternatives: string[];
  correctAlternative: number;
}

export function useQuestions(level: JLPTLevel) {
  const db = useSQLiteContext();

  const selectQuestion = async (table:string, column: string, value: any, order: string = "RANDOM()") : Promise<Question | null> => {
    const query = `
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
    GROUP_CONCAT(${level}.tags.name) as tags
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
      WHERE ${level}.${table}.${column} = ?
      GROUP BY ${level}.questions.id 
      ORDER BY ${order};`;

    const result = await db.getFirstAsync<QuestionQuery>(query, value)
    if(!result)
      return null;

    const alternatives: Alternative = {
      id: result.alternativeId,
      alternatives: [result.alternative1, result.alternative2, result.alternative3, result.alternative4],
      correctAlternative: result.correctAlternative
    }
    const image = (result.imagePath != null) ? `${level}${result.imagePath}` : null;
    const audio = (result.audioPath != null) ? `${level}${result.audioPath}` : null;
    const question: Question = {
      id: result.id,
      text: result.questionText,
      statement: result.statementText,
      type: result.questionType,
      alternatives: alternatives,
      image: image,
      audio: audio,
      contextualText: result.contextualText,
      tags: result?.tags ? result.tags.split(",") : []
    }
    return question;
  }

  const selectById = async (id: number) => {
    return await selectQuestion("questions","id", id);
  }

  const selectByTagName = async (tagName: string) => {
    return await selectQuestion("tags","name", tagName);
  }

  const selectByTypeRandom = async (type: string) => {
    return await selectQuestion("questions","question_type", type);
  }

  return {
    selectById, selectByTagName, selectByTypeRandom
  };
}