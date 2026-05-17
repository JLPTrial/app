import { useEffect, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, vw } from '../../styles/globals';

export default function AlternativeBody({ alternatives, answer, onChoice, choice, ref }: { alternatives: string[], answer: number, onChoice: (choice: number) => void, choice: number, ref: any }) {

  const [userChoice, setUserChoice] = useState<number>(-1);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      confirmAlternative() {
        setIsConfirmed(true);
      },
      reset() {
        setUserChoice(-1);
        setIsConfirmed(false);
      }
    };
  }, []);

  useEffect(() => {
    setUserChoice(choice);
  }, [choice]);

  const handlePressableStyle = (alternative: number, pressed: boolean) => {
    if (!isConfirmed) {
      if (pressed || alternative === userChoice)
        return styles.pressed;
      return styles.default;
    }

    if (alternative === answer)
      return styles.rightAlternative;
    if (alternative === userChoice && userChoice !== answer)
      return styles.wrongAlternative;
    return styles.disabled;
  };

  const handleTextColor = (alternative: number) => {
    if (isConfirmed)
      if (alternative === answer || alternative === userChoice)
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
          <Text style={{ color: handleTextColor(alternative) }}>{alternativeText}</Text>
        </Pressable>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexDirection: 'column',
    backgroundColor: 'none',
  },
  questionImage: {
    width: 180,
    height: 180,
  },
  alternative: {
    backgroundColor: 'none',
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