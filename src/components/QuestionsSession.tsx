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
  const [seconds, setSeconds] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s - 1 > 0) s = s-1;
        else s = 0;

        return s;
      });
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

  var result = useRef({
    right: {
      total: 0,
      kanji: 0,
      vocabulary: 0,
      grammar: 0,
      reading: 0,
      listening: 0,
    },
    total: {
      total: 0,
      kanji: 0,
      vocabulary: 0,
      grammar: 0,
      reading: 0,
      listening: 0
    }
  });

  const handleNextQuestion = (choice: number) => {
    const res = result.current;
    if (choice + 1 === question.correctAlternative) {
      rightAnswers.current++;
      res.right.total++;
      res.right[question.type]++;
      
    }
    res.total.total++;
    res.total[question.type]++;
    db.insertAnswer(question, level, choice + 1);
    if (index + 1 < questions.length) {
      setIndex(index => index + 1);
    }
    else {
      onFinish(res);
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