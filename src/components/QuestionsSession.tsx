import Screen from '@/components/Screen';
import { Question, useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Loading from '../app/loading';
import QuestionScreen from './QuestionsScreen';

export default function QuestionSession() {
  const { data } = useStorage();

  const level = data.jlptLevel;
  const questions = data.questionsSession;


  const db = useQuestions(level);

  const [index, setIndex] = useState<number>(data.questionIndexSession);
  const [question, setQuestion] = useState<Question>(questions[0]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index < questions.length)
      setQuestion(questions[index]);
    else
      setIndex(0);
  }, [index]);

  useEffect(() => {
    async function load() {
      setLoading(false);
    }
    load();
  },);

  const handleNextQuestion = (chosenAlternative: number) => {
    db.insertAnswer(question, level, chosenAlternative + 1);
    setIndex(index + 1);
  };

  if (loading) return <Loading />;
  return (
    <Screen>
      <Text>Questão {index + 1}/{questions.length}</Text>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}