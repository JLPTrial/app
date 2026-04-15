import { useSQLiteContext } from 'expo-sqlite';

export type JLPTLevel = 'n5' | 'n4';

export function useQuestions(level: JLPTLevel) {
  const db = useSQLiteContext();

  // Inside here we can have different functions that get questions by any type of parameters
  // For example:
  // const getQuestionByIdAndType = async (type: string)

  // return { getQuestionByIdAndType };
}