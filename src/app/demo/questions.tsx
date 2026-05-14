import { useEffect, useState } from 'react';
import { Question, useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import QuestionSession from '@/components/QuestionsSession';
import Loading from '../loading';

export default function QuestionScreen() {

  const { data, setValue } = useStorage();
  const questionsDB = useQuestions(data.jlptLevel);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results: Question[] = await questionsDB.selectByTypeMany('listening', 5);
      setValue('questionsSession', results);
      setValue('questionIndexSession', 0);
      setLoading(false);
    }
    load();
  },);

  if (loading) return <Loading />;
  return <QuestionSession />;
}