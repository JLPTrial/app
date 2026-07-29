import { Paths } from 'expo-file-system';
import { SQLiteDatabase } from "expo-sqlite";
import { JLPTLevel } from "@/types/types";

const LEVELS: JLPTLevel[] = ['N5','N4'];

const answerTableQuery = `
    CREATE TABLE IF NOT EXISTS answered_questions (
      question_id INTEGER NOT NULL,
      jlpt_level TEXT NOT NULL
        CHECK (jlpt_level IN ('${LEVELS.join(`','`)}')),
      answered_date TEXT DEFAULT CURRENT_TIMESTAMP,
      is_correct INTEGER NOT NULL,
      PRIMARY KEY (question_id, jlpt_level)
    );`;

const examDBQuery = `
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id INTEGER PRIMARY KEY,
      score INTEGER NOT NULL,
      correct_answers INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      started_at INTEGER NOT NULL,
      finished_at INTEGER,
      approved INTEGER NOT NULL CHECK (approved IN (0, 1)),
      jlpt_level TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS exam_attempt_questions (
      attempt_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      question_order INTEGER NOT NULL,
      selected_alternative INTEGER,
      is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
      PRIMARY KEY (attempt_id, question_order),
      FOREIGN KEY (attempt_id)
        REFERENCES exam_attempts(id)
        ON DELETE CASCADE,
      FOREIGN KEY (question_id)
        REFERENCES questions(id)
        ON DELETE CASCADE
    );
  `;

const levelToPath = (level : JLPTLevel) => {
  return `${Paths.document.uri}/SQLite/${level}.db`.replace('file://', '');
};

export const createAnswerTable = async (db: SQLiteDatabase) => {
  await db.execAsync(answerTableQuery);
};

export const createExamTables = async (db: SQLiteDatabase) => {
  await db.execAsync(examDBQuery);
};

export const attachQuestionsDatabase = async (db: SQLiteDatabase) => {
  for(const level of LEVELS){
    await db.execAsync(`ATTACH DATABASE '${levelToPath(level)}' AS ${level};`);
  }
};