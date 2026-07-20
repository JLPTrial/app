import { JLPTLevel, Question } from "@/types/types";
import { Storage } from "expo-sqlite/kv-store";
import { createContext, PropsWithChildren, useState } from "react";
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
};

const defaultStorage: StorageSchema = {
  jlptLevel: 'N5',
  questionsSession: [],
  questionIndexSession: 0,
  furigana: false,
  hapticFeedback: true,
  fontSize: 0,
  volume: 0,
  isDarkMode: Appearance.getColorScheme() === 'dark',
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

  const setValue = <K extends keyof StorageSchema>(
    key: K,
    value: StorageSchema[K]
  ) => {
    Storage.setItemSync(key, JSON.stringify(value));

    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <StorageContext.Provider value={{ data, setValue }}>
      {children}
    </StorageContext.Provider>
  );

}