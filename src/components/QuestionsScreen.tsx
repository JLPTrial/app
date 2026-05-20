import AlternativeBody from '@/components/question/AlternativeBody';
import QuestionBody from '@/components/question/QuestionBody';
import { Question } from '@/types/types';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Loading from '../app/loading';

export default function QuestionScreen({ question, onNextQuestion }: { question: Question, onNextQuestion: any }) {

  const [choice, setChoice] = useState<number>(-1);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(false);
      setChoice(-1);
      setConfirmedAnswer(false);
    }
    load();
  }, [question]);

  const onChoice = (alternative: number) => {
    setChoice(alternative);
  };

  const confirmAlternative = (choice: number) => {
    if (choice !== -1)
      setConfirmedAnswer(true);
  };


  const handleNextQuestion = () => {
    onNextQuestion(choice);
  };

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <QuestionBody question={question} />
      <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} onChoice={onChoice} choice={choice} isConfirmed={confirmedAnswer} />
      {(!confirmedAnswer)
        ? <Pressable onPress={() => confirmAlternative(choice)}><Text>Confirmar</Text></Pressable>
        : <Pressable onPress={() => handleNextQuestion()}><Text>Continuar</Text></Pressable>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    flexDirection: 'column',
  }
});