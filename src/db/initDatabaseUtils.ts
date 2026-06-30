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

const levelToPath = (level : JLPTLevel) => {
  return `${Paths.document.uri}/SQLite/${level}.db`.replace('file://', '');
};

export const createAnswerTable = async (db: SQLiteDatabase) => {
  await db.execAsync(answerTableQuery);
};

export const attachQuestionsDatabase = async (db: SQLiteDatabase) => {
  for(const level of LEVELS){
    await db.execAsync(`ATTACH DATABASE '${levelToPath(level)}' AS ${level};`);
  }
};