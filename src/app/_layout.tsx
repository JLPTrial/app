import { moveDatabase } from "@/db/moveDatabase";
import { Stack } from "expo-router";
import { Paths } from 'expo-file-system';
import { Suspense, useEffect, useState } from "react";
import { SQLiteProvider, SQLiteDatabase } from "expo-sqlite"
import Loading from "./loading";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  const n5Path = `${Paths.document.uri}/SQLite/N5.db`.replace('file://', '');
  const userDBCreation = `
    CREATE TABLE IF NOT EXISTS answered_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    answered_date TEXT DEFAULT CURRENT_TIMESTAMP,
    jlpt_level TEXT NOT NULL,
    chosen_alternative INTEGER NOT NULL,
    question_id INTEGER NOT NULL
    );`;

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider 
        databaseName="main.db"
        onInit={async (db: SQLiteDatabase) => {
          await db.execAsync("PRAGMA foreign_keys = ON;");
          await db.execAsync(`ATTACH DATABASE '${n5Path}' AS N5;`);
          await db.execAsync(userDBCreation);
        }}
      >
        <Stack />
      </SQLiteProvider>
    </Suspense>
  );
}