import AlternativeBody from '@/components/question/AlternativeBody';
import QuestionBody from '@/components/question/QuestionBody';
import { colors, vh } from '@/styles/globals';
import { Question } from '@/types/types';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import BottomButton from './pressable/BottomButton';

type buttonState = 'disabled' | 'continue' | 'confirm';

const handleStyle = (choice: number, confirmedAnswer: boolean): buttonState => {
  if (choice === -1) {
    return 'disabled';
  }
  if (confirmedAnswer) {
    return 'continue';
  }
  return 'confirm';
};

export default function QuestionScreen({ question, onNextQuestion }: { question: Question, onNextQuestion: any }) {

  const [choice, setChoice] = useState<number>(-1);
  const [confirmedAnswer, setConfirmedAnswer] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const onChoice = (alternative: number) => {
    setChoice(alternative);
  };

  const confirmAlternative = () => {
    setConfirmedAnswer(true);
  };

  const handleNextQuestion = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    onNextQuestion(choice);
    setConfirmedAnswer(false);
    setChoice(-1);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scroll} ref={scrollRef} showsVerticalScrollIndicator={false} >
        <QuestionBody question={question} />
        <AlternativeBody alternatives={question.alternatives} answer={question.correctAlternative - 1} onChoice={onChoice} choice={choice} isConfirmed={confirmedAnswer} />
      </ScrollView>
      {(!confirmedAnswer)
        ? <BottomButton onPress={() => confirmAlternative()}
          disabled={(choice === -1)}
          style={buttonStyle[handleStyle(choice, confirmedAnswer)]}
          textStyle={textStyle[handleStyle(choice, confirmedAnswer)]}
          text="Confirmar"
          toFlex={false}/>
        : <BottomButton onPress={() => handleNextQuestion()}
          style={buttonStyle[handleStyle(choice, confirmedAnswer)]}
          textStyle={textStyle[handleStyle(choice, confirmedAnswer)]}
          text="Continuar"
          toFlex={false}/>
      }
    </View>
  );
}

const buttonStyle = {
  confirm:  { backgroundColor: colors.primaryLight, },
  continue: { backgroundColor: colors.primary, },
  disabled: { backgroundColor: '#ccc', },
};

const textStyle = {
  confirm:  {  },
  continue: { color: colors.textLight, },
  disabled: { color: colors.textMuted, },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // height: 0 is needed
    height: 0,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    gap: 3 * vh,
  }
});