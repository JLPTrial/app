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

  const insertExam = async (
    score : number,
    totalQuestions : number,
    correctAnswers : number,
    startedAt : number,
    finishedAt : number,
    approved : boolean,
    jlptLevel : string,
  ): Promise<boolean> => {
    const query = `INSERT INTO exam_attempts (score, total_questions, correct_answers, started_at, finished_at, approved, jlpt_level) VALUES (?,?,?,?,?,?,?)`;
    try {
      await db.runAsync(query, `${score}`, `${totalQuestions}`, `${correctAnswers}`, `${startedAt}`, `${finishedAt}`, approved ? '1' : '0', `${jlptLevel}`);

      return true;
    } catch {
      return false;
    }
  };

  return { insertAnswer, insertExam };
}