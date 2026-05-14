import AlternativeBody from '@/components/question/AlternativeBody';
import QuestionBody from '@/components/question/QuestionBody';
import { Question } from '@/db/queries';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Loading from '../app/loading';

export default function QuestionScreen({ question, onNextQuestion }: { question: Question, onNextQuestion: any }) {

  const [chosenAlternative, setChosenAlternative] = useState<number>(-1);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const confirmRef = useRef(null);

  useEffect(() => {
    async function load() {
      setLoading(false);
      setChosenAlternative(-1);
      setConfirmedAnswer(false);
    }
    load();
  }, [question]);

  const choseAlternative = (alternative: number) => {
    setChosenAlternative(alternative);
  };

  const confirmAlternative = () => {
    if (chosenAlternative === -1)
      return;
    setConfirmedAnswer(true);
    confirmRef.current.confirmAlternative(chosenAlternative);
  };


  const handleNextQuestions = () => {
    confirmRef.current.reset();
    onNextQuestion(chosenAlternative);
  };

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <QuestionBody question={question} />
      <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} choose={choseAlternative} onChoose={chosenAlternative} ref={confirmRef} />
      {(!confirmedAnswer)
        ? <Pressable onPress={() => confirmAlternative()}> <Text>Confirmar</Text></Pressable>
        : <Pressable onPress={() => handleNextQuestions()}> <Text>Continuar</Text></Pressable>
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