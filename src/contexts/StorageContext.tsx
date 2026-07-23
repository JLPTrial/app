import { JLPTLevel, Question } from "@/types/types";
import { Storage } from "expo-sqlite/kv-store";
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Appearance } from "react-native";

type StorageSchema = {
  jlptLevel: JLPTLevel;
  questionsSession: Question[];
  questionIndexSession: number;
  furigana: boolean;
  hapticFeedback: boolean;
  fontSize: number;
  volume: number;
  isDarkMode: boolean;
  timer: boolean;
};

const defaultStorage: StorageSchema = {
  jlptLevel: 'N5',
  questionsSession: [],
  questionIndexSession: 0,
  furigana: true,
  hapticFeedback: true,
  fontSize: 0,
  volume: 100,
  isDarkMode: Appearance.getColorScheme() === 'dark',
  timer: false,
};

type StorageContextType = {
  data: StorageSchema;
  setValue: <K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ) => void;
};

export const StorageContext = createContext<StorageContextType | null>(null);

export function StorageProvider({ children }: PropsWithChildren) {

  const [data, setData] = useState<StorageSchema>(() => {
    const result: any = { ...defaultStorage };

    for (const key of Object.keys(defaultStorage) as (keyof StorageSchema)[]) {
      const stored: any = Storage.getItemSync(key);

      if (stored !== null) {
        result[key] = JSON.parse(stored);
      }
    }

    return result;
  });

  const setValue = useCallback(<K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ) => {
    Storage.setItemSync(key, JSON.stringify(value));

    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const value = useMemo(() => ({ data, setValue }), [data, setValue]);

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );

}