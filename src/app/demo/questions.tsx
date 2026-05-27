import { useEffect, useState } from 'react';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import QuestionSession from '@/components/QuestionsSession';
import Loading from '../loading';
import { router } from 'expo-router';
import { Question } from '@/types/types';

export default function QuestionScreen() {

  const { data, setValue } = useStorage();
  const db = useQuestions(data.jlptLevel);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results: Question[] = await db.selectByTypeMany('reading', 5);
      setValue('questionsSession', results);
      setValue('questionIndexSession', 0);
      setLoading(false);
    }
    load();
  },);

  const onFinish = (rightAnswers: number, total: number) => {
    alert(`Acertos ${rightAnswers}/${total}`);
    router.push("/");
  };

  if (loading) return <Loading />;
  return <QuestionSession sessionType={"Estudo curto"} onFinish={onFinish} />;
}