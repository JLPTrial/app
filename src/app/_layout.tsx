import { moveDatabase } from "@/db/moveDatabase";
import { Stack } from "expo-router";
import { Paths } from 'expo-file-system';
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    moveDatabase().then(() => setIsReady(true));
  }, []);

  if (!isReady) return <Loading />;

  const n5Path = `${Paths.document.uri}/SQLite/N5.db`.replace('file://', '');

  return (
    <Stack />
  );
}