import AlternativeBody from '@/components/question/AlternativeBody';
import QuestionBody from '@/components/question/QuestionBody';
import { colors, vw } from '@/styles/globals';
import { Question } from '@/types/types';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from './texts/AppText';

const buttonStyle = (choice: number, confirmedAnswer: boolean) => {
  if (choice === -1) {
    return styles.disabledButton;
  }
  if (confirmedAnswer) {
    return styles.buttonContinue;
  }
  return styles.buttonConfirm;
};

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
      <ScrollView>
        <QuestionBody question={question} />
        <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} onChoice={onChoice} choice={choice} isConfirmed={confirmedAnswer} />
      </ScrollView>
      {(!confirmedAnswer)
        ? <Pressable onPress={() => confirmAlternative(choice)} style={[styles.button, buttonStyle(choice, confirmedAnswer)]}><AppText center={true}>Confirmar</AppText></Pressable>
        : <Pressable onPress={() => handleNextQuestion()} style={[styles.button, buttonStyle(choice, confirmedAnswer)]}><AppText style={styles.textContinue} center={true}>Continuar</AppText></Pressable>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // height: 0 is needed
    height: 0,
    gap: 20,
  },
  button: {
    width: 50 * vw,
    borderRadius: 999,
    padding: 10,
  },
  disabledButton: {
    backgroundColor: colors.textMuted
  },
  buttonConfirm: {
    backgroundColor: colors.primaryLight,
  },
  buttonContinue: {
    backgroundColor: colors.primary,
  },
  textContinue: {
    color: colors.textLight,
  }
});