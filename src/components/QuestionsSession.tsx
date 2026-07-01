import Screen from '@/components/Screen';
import { useStorage } from '@/hooks/useStorage';
import { useRef, useState } from 'react';
import { AppText } from './texts/AppText';
import QuestionScreen from './QuestionsScreen';
import { useUserDatabase } from '@/db/insertions';

// sessionType indica na tela se é um simulado ou uma sessão de estudo
export default function QuestionSession({ onFinish, sessionType }: { onFinish: any, sessionType: string }) {
  const { data } = useStorage();

  
  const questions = data.questionsSession;

  const [index, setIndex] = useState<number>(data.questionIndexSession);
  let rightAnswers = useRef(0);
  let question = questions[index];

  const db = useUserDatabase();
  const level = data.jlptLevel;

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
      <AppText>{sessionType} - Questão {index + 1}/{questions.length}</AppText>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}