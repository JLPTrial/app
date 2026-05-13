import { useEffect, useRef, useState } from 'react';
import { JLPTLevel, Question, useQuestions } from '@/db/queries';
import Screen from '@/components/Screen';
import QuestionBody from '@/components/QuestionBody';
import AlternativeBody from '@/components/AlternativeBody';
import Loading from '../loading';
import { Pressable, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function QuestionScreen() {
  const { level } = useLocalSearchParams<{ level: JLPTLevel }>();
  const db = useQuestions(level);
  const [question, setQuestion] = useState<Question | null>(null);
  const [chosenAlternative, setChosenAlternative] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const confirmRef = useRef(null);

  useEffect(() => {
    async function loadQuestion() {
      const question = await db.selectById(450);
      setQuestion(question);
      setLoading(false);
    }
    loadQuestion();
  }, [db]);

  const choseAlternative = (alternative: number) => {
    setChosenAlternative(alternative);
  };

  const confirmAlternative = () => {
    confirmRef.current.confirmAlternative(chosenAlternative);
  };

  if (loading) return <Loading />;
  if (question === null) return null;
  return (
    <Screen>
      <QuestionBody question={question} />
      <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} choose={choseAlternative} onChoose={chosenAlternative} ref={confirmRef} />
      <Pressable onPress={() => confirmAlternative()}> <Text>Confirmar</Text></Pressable>
    </Screen>

  );
}