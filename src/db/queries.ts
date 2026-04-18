import { useSQLiteContext } from 'expo-sqlite';

export type JLPTLevel = 'n5' | 'n4';

// Interfaces to manage queries
export interface Question {
  id: number;
  questionText: string;
  statementText: string;
  questionType: string;
  media: Media | null;
  alternatives: Alternative;
}

interface Media {
  id: number;
  contextualText: string;
  imageFilePath: string;
  audioFilePath: string;
}

export interface Alternative {
  id: number;
  alternatives: string[];
  correctAlternative:number;
}

export function useQuestions(level: JLPTLevel) {
  const db = useSQLiteContext();

  const selectMediaById = async (id: number | null) => {
    if(id == null) return null;
    let queryMedia = await db.getFirstAsync(`
        SELECT *
        FROM media
        WHERE id = ?
      `, id);
    let contextualText = "";
    if(queryMedia.contextual_text_id != null){
      contextualText = selectContextualTextById(queryMedia.contextual_text_id);
    }
    const prefix = level.toUpperCase( )
    let imagePath = queryMedia.image_file_path;
    if(imagePath != null)
      imagePath = `${prefix}${imagePath}`
    let audioPath = queryMedia.audio_file_path;
    if(audioPath != null)
      audioPath = `${prefix}${audioPath}`
      
    const media : Media = {
      id: queryMedia.id,
      contextualText: contextualText,
      imageFilePath: imagePath,
      audioFilePath: audioPath
    };

    return media
  }

  const selectStatementById = async (id: number) => {
    const statement = await db.getFirstAsync<string>(`
        SELECT statement_text
        FROM statement
        WHERE id = ?
      `, id);
    return statement;
  }

  const selectContextualTextById = async (id: number | null) => {
    const contextualText = await db.getFirstAsync<string>(`
        SELECT contextual_text
        FROM contextual_texts
        WHERE id = ?
      `, id);
    return contextualText;
  }

  const selectAlternativesById = async (id: number | null) => {
    const queryAlternative = await db.getFirstAsync<Alternative>(`
        SELECT *
        FROM alternatives
        WHERE id = ?
      `, id);
    const alternatives : Alternative = {
      id: queryAlternative.id,
      alternatives: [queryAlternative.alternative_1, queryAlternative.alternative_2, queryAlternative.alternative_3, queryAlternative.alternative_4],
      correctAlternative: queryAlternative.correct_alternative
    }
    return alternatives;
  }

  // Combine Media and statement data into a question instance
  const prepareQuestion = async(queryQuestion:any) => {
    const media = await selectMediaById(queryQuestion.media_id);
    const alternatives = await selectAlternativesById(queryQuestion.alternative_id);
    const statement = await selectStatementById(queryQuestion.statement_id);
    const question: Question = {
      id: queryQuestion.id,
      statementText: statement,
      questionText: queryQuestion.question_text,
      questionType: queryQuestion.question_type,
      media: media,
      alternatives: alternatives
    }
    return question;
  }

  const selectById = async (id: number) => {
    const queryQuestion = await db.getFirstAsync(`
      SELECT * 
      FROM questions 
      WHERE id = ?
    `, id);
    const question = prepareQuestion(queryQuestion);
    return question;
  }

  const selectByAlternativeId = async (alternativeId: number) => {
    const queryQuestion = await db.getFirstAsync(`
      SELECT * 
      FROM questions 
      WHERE alternative_id = ?
    `, alternativeId);
    const question = prepareQuestion(queryQuestion);
    return question;
  }

  const selectByStatementId = async (statementId: number) => {
    const queryQuestion = await db.getFirstAsync(`
      SELECT * 
      FROM questions 
      WHERE statement_id = ?
    `,statementId);
    const question = prepareQuestion(queryQuestion);
    return question;
  }

  const selectByTagId = async (tagId: number) => {
    const queryQuestion = await db.getFirstAsync<Question>(`
      SELECT * 
      FROM questions 
      INNER JOIN question_tags 
        ON questions.id == question_tags.question_id 
        AND question_tags.id = ?
      `, tagId);
    const question = prepareQuestion(queryQuestion);
    return question;
  }

  const selectByTypeRandom = async (type: string) => {
    const queryQuestion = await db.getFirstAsync<Question>(`
      SELECT * 
      FROM questions
      WHERE question_type = ?
      ORDER BY RANDOM()
      `, type);
    const question = prepareQuestion(queryQuestion);
    return question;
  }

  return {selectById, selectByAlternativeId, selectByStatementId, selectByTagId,
    selectByTypeRandom};
}