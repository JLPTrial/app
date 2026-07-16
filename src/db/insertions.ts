import { JLPTLevel, Question } from '@/types/types';
import { useSQLiteContext } from 'expo-sqlite';

export type AnsweredStatus = 'answered' | 'unanswered' | 'all';

export function useUserDatabase() {
  const db = useSQLiteContext();

  const insertAnswer = async (question: Question, level: JLPTLevel, answer: number): Promise<boolean> => {
    const query = `INSERT INTO answered_questions (jlpt_level, is_correct, question_id) VALUES (?,?,?)`;
    try {
      await db.runAsync(query, `${level}`, answer === question.correctAlternative, question.id);
      return true;
    } catch {
      return false;
    }
  };

  return { insertAnswer };
}