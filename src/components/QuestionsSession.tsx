import Screen from '@/components/Screen';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { useEffect, useState } from 'react';
import { Question } from '@/types/types';
import { Text } from 'react-native';
import Loading from '../app/loading';
import QuestionScreen from './QuestionsScreen';

// sessionType indica na tela se é um simulado ou uma seção de estudo
export default function QuestionSession({ onFinish, sessionType }: { onFinish: any, sessionType: string }) {
  const { data } = useStorage();

  const level = data.jlptLevel;
  const questions = data.questionsSession;
  const db = useQuestions(level);

  const [index, setIndex] = useState<number>(data.questionIndexSession);
  const [question, setQuestion] = useState<Question>(questions[index]);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (index < questions.length)
      setQuestion(questions[index]);
    else
      onFinish(rightAnswers, questions.length);
  }, [index, onFinish, question, rightAnswers]);

  useEffect(() => {
    async function load() {
      setLoading(false);
    }
    load();
  },);

  const handleNextQuestion = (chosenAlternative: number) => {
    db.insertAnswer(question, level, chosenAlternative + 1);
    if (chosenAlternative + 1 === question.correctAlternative)
      setRightAnswers(rightAnswers + 1);
    setIndex(index + 1);
  };

  if (loading) return <Loading />;
  return (
    <Screen>
      <Text>{sessionType} - Questão {index + 1}/{questions.length}</Text>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}