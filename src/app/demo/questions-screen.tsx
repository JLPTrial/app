import { useEffect, useState } from 'react';
import { Question, useQuestions } from '@/db/queries';
import Screen from '@/components/Screen';
import QuestionBody from '@/components/QuestionBody';
import Loading from '../loading';

export default function QuestionScreen() {
  const db = useQuestions("N5");
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadQuestion() {
      const question = await db.selectById(450);
      setQuestion(question);
      setLoading(false);
    }

    loadQuestion();
  }, []);

  if (loading) return <Loading />;

  return (
    <Screen>
      <QuestionBody question={question} />
    </Screen>
  );
}
