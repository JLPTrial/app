import { Pressable, StyleSheet, View } from 'react-native';
import { colors, vh, vw } from '../../styles/globals';
import { AppText } from '../texts/AppText';

type buttonState = 'pressed' | 'default' | 'rightAlternative' | 'wrongAlternative' | 'disabled';
export default function AlternativeBody({ alternatives, answer, onChoice, choice, isConfirmed }: { alternatives: string[], answer: number, onChoice: (choice: number) => void, choice: number, isConfirmed: boolean }) {

  const handleStyle = (alternative: number, pressed: boolean = false): buttonState => {
    if (!isConfirmed) {
      if (pressed || alternative === choice)
        return 'pressed';
      return 'default';
    }

    if (alternative === answer)
      return 'rightAlternative';
    if (alternative === choice && choice !== answer)
      return 'wrongAlternative';
    return 'disabled';
  };

  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, alternative: number) => {
        return <Pressable
          onPress={() => { onChoice(alternative); }}
          style={
            ({ pressed }) => [styles.alternative, buttonStyle[handleStyle(alternative, pressed) as keyof typeof buttonStyle]]
          }
          key={alternative}
          disabled={isConfirmed}>
          <AppText style={textStyle[handleStyle(alternative) as keyof typeof textStyle]} center={true}>{alternativeText}</AppText>
        </Pressable>;
      })}
    </View>
  );
}

const buttonStyle = {
  rightAlternative: { borderColor: 'green', },
  wrongAlternative: { borderColor: 'red', },
  pressed: { backgroundColor: colors.selected, },
  disabled: { backgroundColor: '#ccc', },
};

const textStyle = {
  rightAlternative: { color: 'green', },
  wrongAlternative: { color: 'red', },
  pressed: { /* No Style for now */ },
  disabled: { color: colors.textMuted, },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    padding: 10,
  },
  alternative: {
    width: (90 * vw) - 48,
    height: 10 * vh,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 999,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.border,
  },
});