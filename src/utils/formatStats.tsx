import { Question } from "@/types/types";

export const calculateRightRatio = (questions: Question[]) => {
  const total = questions.length;
  if (total === 0) {
    return 0;
  }
  const correct = questions.filter((question) => question.isCorrect).length;
  return correct / total;
};