import { moveDatabase } from "@/db/moveDatabase";
import { Paths } from 'expo-file-system';
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import React from "react";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  const n5Path = `${Paths.document.uri}/SQLite/N5.db`.replace('file://', '');
  const userDBCreation = `
    CREATE TABLE IF NOT EXISTS answered_questions (
      question_id INTEGER NOT NULL,
      jlpt_level TEXT NOT NULL,
      answered_date TEXT DEFAULT CURRENT_TIMESTAMP,
      is_correct INTEGER NOT NULL,
      PRIMARY KEY (question_id, jlpt_level)
    );`;

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="ATmain.db"
        onInit={async (db: SQLiteDatabase) => {
          await db.execAsync("PRAGMA foreign_keys = ON;");
          await db.execAsync(`ATTACH DATABASE '${n5Path}' AS N5;`);
           await db.execAsync(userDBCreation);
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}