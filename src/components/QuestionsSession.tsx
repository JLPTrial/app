import Screen from '@/components/Screen';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { useRef, useState } from 'react';
import { Text } from 'react-native';
import QuestionScreen from './QuestionsScreen';

// sessionType indica na tela se é um simulado ou uma seção de estudo
export default function QuestionSession({ onFinish, sessionType }: { onFinish: any, sessionType: string }) {
  const { data } = useStorage();

  const level = data.jlptLevel;
  const questions = data.questionsSession;
  const db = useQuestions(level);

  const [index, setIndex] = useState<number>(data.questionIndexSession);
  let rightAnswers = useRef(0);
  let question = questions[index];

  const handleNextQuestion = (choice: number) => {
    if (choice + 1 === question.correctAlternative) {
      rightAnswers.current++;
    }
    db.insertAnswer(question, level, choice + 1);
    if (index + 1 < questions.length) {
      setIndex(index => index + 1);
    }
    else {
      onFinish(rightAnswers.current, questions.length);
    }
  };

  return (
    <Screen>
      <Text>{sessionType} - Questão {index + 1}/{questions.length}</Text>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}