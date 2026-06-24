import { useTheme } from '@/hooks/useTheme';
import { ColorScheme, vh } from '@/styles/globals';
import { Pressable, StyleSheet, View } from 'react-native';
import Statement from '../texts/Statement';

type buttonState = 'right' | 'wrong' | 'disabled' | 'pressed' | 'chosen' | 'default';

export default function AlternativeBody({ alternatives, answer, onChoice, choice, isConfirmed }: { alternatives: string[], answer: number, onChoice: (choice: number) => void, choice: number, isConfirmed: boolean }) {
  const { colors } = useTheme();

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

  const buttonStyle = buildButtonStyle(colors);
  const textStyle = buildTextStyle(colors);

  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, alternative: number) => {
        return <Pressable
          onPress={() => { onChoice(alternative); }}
          style={
            ({ pressed }) => [
              styles.alternative,
              { borderColor: colors.border },
              buttonStyle[handleStyle(alternative, pressed)],
            ]
          }
          key={alternative}
          disabled={isConfirmed}>
          {({ pressed }) => (
            <Statement style={textStyle[handleStyle(alternative, pressed) as keyof typeof textStyle]} center={true} statement={alternativeText} />
          )}
        </Pressable>;
      })}
    </View>
  );
}

function buildButtonStyle(colors: ColorScheme) {
  return {
    right:    { borderColor: colors.success },
    wrong:    { borderColor: colors.error },
    pressed:  { backgroundColor: colors.alternativePressed },
    chosen:   { borderColor: colors.alternativeChosen },
    disabled: { backgroundColor: colors.alternativeDisabled },
    default:  {},
  };
}

function buildTextStyle(colors: ColorScheme) {
  return {
    right:    { color: colors.success },
    wrong:    { color: colors.error },
    pressed:  {},
    chosen:   { color: colors.alternativeChosen },
    disabled: { color: colors.textMuted },
    default:  {},
  };
}

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
  },
});