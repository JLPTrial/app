import { Pressable, StyleSheet, View } from 'react-native';
import { colors, vw } from '../../styles/globals';
import { AppText } from '../texts/AppText';

export default function AlternativeBody({ alternatives, answer, onChoice, choice, isConfirmed }: { alternatives: string[], answer: number, onChoice: (choice: number) => void, choice: number, isConfirmed: boolean }) {

  const handlePressableStyle = (alternative: number, pressed: boolean) => {
    if (!isConfirmed) {
      if (pressed || alternative === choice)
        return styles.pressed;
      return styles.default;
    }

    if (alternative === answer)
      return styles.rightAlternative;
    if (alternative === choice && choice !== answer)
      return styles.wrongAlternative;
    return styles.disabled;
  };

  const handleTextColor = (alternative: number) => {
    if (isConfirmed)
      if (alternative === answer || alternative === choice)
        return '#fff';
    return;
  };


  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, alternative: number) => {
        return <Pressable
          onPress={() => { onChoice(alternative); }}
          style={
            ({ pressed }) => [styles.alternative, handlePressableStyle(alternative, pressed)]
          }
          key={alternative}
          disabled={isConfirmed}>
          <AppText style={{ color: handleTextColor(alternative) }}>{alternativeText}</AppText>
        </Pressable>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    padding:10,
  },
  alternative: {
    width: 70 * vw,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.selected,
  },
  default: {
    backgroundColor: colors.surface,
  },
  disabled: {
    backgroundColor: colors.textMuted,
  },
  rightAlternative: {
    backgroundColor: 'green',
  },
  wrongAlternative: {
    backgroundColor: 'red',
  }
});