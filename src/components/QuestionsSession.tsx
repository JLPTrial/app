import Screen from '@/components/Screen';
import { useStorage } from '@/hooks/useStorage';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import QuestionScreen from './QuestionsScreen';
import { useUserDatabase } from '@/db/insertions';
import { AppText } from './texts/AppText';

// sessionType indica na tela se é um simulado ou uma sessão de estudo
export default function QuestionSession({ onFinish, sessionType }: { onFinish: any, sessionType: string }) {
  const { data } = useStorage();


  const questions = data.questionsSession;

  const [index, setIndex] = useState<number>(data.questionIndexSession);
  let rightAnswers = useRef(0);
  let question = questions[index];
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds%3600 / 60);
    const secs = totalSeconds%3600 % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  if (!seconds) {
    Alert.alert("O tempo acabou");
  }

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
      <AppText style={{ fontSize: 20, textAlign: 'center' }}>
        ⏱ {formatTime(seconds)}
      </AppText>
      <AppText>{sessionType} - Questão {index + 1}/{questions.length}</AppText>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}