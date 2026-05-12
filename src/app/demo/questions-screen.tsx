import { useEffect, useState } from 'react';
import { Question, useQuestions } from '@/db/queries';
import Screen from '@/components/Screen';
import QuestionBody from '@/components/QuestionBody';
import AlternativeBody from '@/components/AlternativeBody';
import Loading from '../loading';

export default function QuestionScreen() {
  const db = useQuestions("N5");
  const [question, setQuestion] = useState<Question | null>(null);
  const [chosenAlternative, setChosenAlternative] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  let index = 0;

  useEffect(() => {
    async function loadQuestion() {
      const question = await db.selectById(450);
      setQuestion(question);
      setLoading(false);
    }
    loadQuestion();
  }, [db, index]);

  const choseAlternative = (alternative: number) => {
    setChosenAlternative(alternative);
  };

  if (loading) return <Loading />;

  return (
    <Screen>
      <QuestionBody question={question} />
      <AlternativeBody alternatives={question.alternatives} choose={choseAlternative} onChoose={chosenAlternative} />
    </Screen>

  );
}