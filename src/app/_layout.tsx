import ThemeTransition from "@/components/ThemeTransition";
import { StorageProvider } from "@/contexts/StorageContext";
import { moveDatabase } from "@/db/moveDatabase";
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { attachQuestionsDatabase, createAnswerTable } from "@/db/initDatabaseUtils";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

    const examDBCreation = `
      CREATE TABLE IF NOT EXISTS exam_attempts (
        id INTEGER PRIMARY KEY,

        score INTEGER NOT NULL,

        correct_answers INTEGER NOT NULL,

        total_questions INTEGER NOT NULL,

        started_at TEXT NOT NULL,

        finished_at TEXT,

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
    `

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="main.db"
        onInit={async (db: SQLiteDatabase) => {
          await db.execAsync("PRAGMA foreign_keys = ON;");
          attachQuestionsDatabase(db);
          createAnswerTable(db);
          await db.execAsync(examDBCreation);
        }}
      >
        <StorageProvider>
          <ThemeTransition>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ThemeTransition>
        </StorageProvider>
      </SQLiteProvider>
    </Suspense>
  );
}