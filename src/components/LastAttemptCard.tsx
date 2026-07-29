import { useQuestions } from "@/db/queries";
import { useStorage } from "@/hooks/useStorage";
import { ExamAttempt } from "@/types/types";
import { secondsToTimer } from "@/utils/parsers";
import { useEffect, useState } from "react";
import { View } from "react-native";
import ResultCard from "./ResultCard";
import { AppText } from "./texts/AppText";


export default function LastAttemptCard(){
  const { data } = useStorage();
  const level = data.jlptLevel;
  const db = useQuestions(level);
  const [lastExam, setLastExam] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    const loadLastExam = async () => {
      const exam = await db.selectLastExam();
      setLastExam(exam);
    };

    loadLastExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!lastExam) return <AppText>Nenhum simulado realizado.</AppText>;

  const durationMs =
    Number(lastExam.finished_at) - Number(lastExam.started_at);

  const durationSeconds = Math.floor(durationMs / 1000);

  const duration = secondsToTimer(durationSeconds);

  return (
    <View>
      <AppText>Dados da Última Tentativa:</AppText>
      <ResultCard label={duration} right={lastExam.correct_answers} total={lastExam.total_questions}/>
    </View>
  );
}