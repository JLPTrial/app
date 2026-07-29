import ThemeTransition from "@/components/ThemeTransition";
import { StorageProvider } from "@/contexts/StorageContext";
import { moveDatabase } from "@/db/moveDatabase";
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { attachQuestionsDatabase, createAnswerTable, createExamTables } from "@/db/initDatabaseUtils";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="main.db"
        onInit={async (db: SQLiteDatabase) => {
          await db.execAsync("PRAGMA foreign_keys = ON;");
          await attachQuestionsDatabase(db);
          await createAnswerTable(db);
          await createExamTables(db);
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