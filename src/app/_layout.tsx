import { StorageProvider } from "@/contexts/StorageContext";
import { moveDatabase } from "@/db/moveDatabase";
import { Paths } from 'expo-file-system';
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  const n5Path = `${Paths.document.uri}/SQLite/N5.db`.replace('file://', '');

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="main.db"
        onInit={async (db: SQLiteDatabase) => {
          await db.execAsync("PRAGMA foreign_keys = ON;");
          await db.execAsync(`ATTACH DATABASE '${n5Path}' AS N5;`);
        }}
      >
        <StorageProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </StorageProvider>
      </SQLiteProvider>
    </Suspense>
  );
}