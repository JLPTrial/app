import AlternativeBody from '@/components/question/AlternativeBody';
import QuestionBody from '@/components/question/QuestionBody';
import { colors, vw } from '@/styles/globals';
import { Question } from '@/types/types';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function QuestionScreen({ question, onNextQuestion }: { question: Question, onNextQuestion: any }) {

  const [choice, setChoice] = useState<number>(-1);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean>(false);

  const onChoice = (alternative: number) => {
    setChoice(alternative);
  };

  const confirmAlternative = (choice: number) => {
    if (choice !== -1)
      setConfirmedAnswer(true);
  };

  const handleNextQuestion = () => {
    onNextQuestion(choice);
    setConfirmedAnswer(false);
    setChoice(-1);
  };

  return (
    <View style={styles.container}>
      <QuestionBody question={question} />
      <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} onChoice={onChoice} choice={choice} isConfirmed={confirmedAnswer} />
      {(!confirmedAnswer)
        ? <Pressable onPress={() => confirmAlternative(choice)} style={styles.button}><Text>Confirmar</Text></Pressable>
        : <Pressable onPress={() => handleNextQuestion()} style={[styles.button, styles.buttonContinue]}><Text style={styles.textContinue}>Continuar</Text></Pressable>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  button: {
    backgroundColor: colors.primaryLight,
    color: colors.textDark,
    width: 50 * vw,
    borderRadius: 999,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContinue: {
    backgroundColor: colors.primary,
  },
  textContinue: {
    color: colors.textLight,
  }
});