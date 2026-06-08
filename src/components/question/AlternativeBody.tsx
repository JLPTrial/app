import { Pressable, StyleSheet, View } from 'react-native';
import { colors, vh } from '../../styles/globals';
import { AppText } from '../texts/AppText';

type buttonState = 'right' | 'wrong' | 'disabled' | 'pressed' | 'chosen' | 'default';
export default function AlternativeBody({ alternatives, answer, onChoice, choice, isConfirmed }: { alternatives: string[], answer: number, onChoice: (choice: number) => void, choice: number, isConfirmed: boolean }) {

  const handleStyle = (alternative: number, pressed: boolean = false): buttonState => {
    if (!isConfirmed) {
      if (pressed)
        return 'pressed';
      if (alternative === choice)
        return 'chosen';
      return 'default';
    }

    if (alternative === answer)
      return 'right';
    if (alternative === choice && choice !== answer)
      return 'wrong';
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
          {({ pressed }) => (
            <AppText style={textStyle[handleStyle(alternative, pressed) as keyof typeof textStyle]} center={true}>{alternativeText}</AppText>
          )}
        </Pressable>;
      })}
    </View>
  );
}

const buttonStyle = {
  right:    { borderColor: colors.success, },
  wrong:    { borderColor: colors.error, },
  pressed:  { backgroundColor: 'rgb(204, 255, 255)' },
  chosen:   { borderColor: '#1D4ED8', },
  disabled: { backgroundColor: '#ccc', },
};

const textStyle = {
  right:    { color: colors.success, },
  wrong:    { color: colors.error, },
  pressed:  {  },
  chosen:   { color: '#1D4ED8', },
  disabled: { color: colors.textMuted, },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    padding: 10,
  },
  alternative: {
    width: `100%`,
    minHeight: 10 * vh,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.border,
  },
});