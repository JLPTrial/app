import Screen from '@/components/Screen';
import { useStorage } from '@/hooks/useStorage';
import { colors } from '@/styles/globals';
import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import QuestionScreen from './QuestionsScreen';
import { useUserDatabase } from '@/db/insertions';
import { AppText } from './texts/AppText';
import Timer from './Timer';

// sessionType indica na tela se é um simulado ou uma seção de estudo
export default function QuestionSession({ onFinish, sessionType, timer }: { onFinish: any, sessionType: string, timer : boolean}) {
  const { data } = useStorage();


  const questions = data.questionsSession;

  const [index, setIndex] = useState<number>(data.questionIndexSession);

  const onFinishTimer = () => {
    Alert.alert("O tempo acabou!");
    setTimerComponent(<Timer style={{color: colors.error}}>Tempo Excedido:</Timer>);
  };
  
  const [timerComponent, setTimerComponent] = useState(<Timer start={3600} end={0} onFinishTimer={onFinishTimer} />);
  let rightAnswers = useRef(0);
  let question = questions[index];

  const db = useUserDatabase();
  const level = data.jlptLevel;

  let result = useRef({
    right: {
      total: 0,
      kanji: 0,
      vocabulary: 0,
      grammar: 0,
      reading: 0,
      listening: 0,
    },
    questionCount: {
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
    res.questionCount.total++;
    res.questionCount[question.type]++;
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
      {
        timer && timerComponent
      }
      <AppText>{sessionType} - Questão {index + 1}/{questions.length}</AppText>
      <QuestionScreen question={question} onNextQuestion={handleNextQuestion}></QuestionScreen>
    </Screen>
  );
}