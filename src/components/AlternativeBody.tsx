import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, vw } from '../styles/globals';
import { useEffect, useImperativeHandle, useState } from 'react';

export default function AlternativeBody({ alternatives, answer, choose, onChoose, ref }: { alternatives: string[], answer: number, choose: (choice: number) => void, onChoose: number, ref: any }) {

  const [chosen, setChosen] = useState<number>(-1);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useEffect(() => {
    setChosen(onChoose);
  }, [onChoose]);


  useImperativeHandle(ref, () => {
    return {
      confirmAlternative() {
        setIsConfirmed(true);
      }
    };
  }, []);

  const handlePressableStyle = (choice: number, pressed: boolean) => {
    if (isConfirmed) {
      if (choice === answer)
        return styles.rightAlternative;
      if (choice === chosen && chosen !== answer)
        return styles.wrongAlternative;
      return styles.disabled;
    }

    if (choice === chosen)
      return styles.pressed;
    return (pressed) ? styles.pressed : styles.default;
  };

  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, choice: number) => {
        return <Pressable
          onPress={() => choose(choice)}
          style={
            ({ pressed }) => [styles.alternative, handlePressableStyle(choice, pressed)]
          }
          key={choice}
          disabled={isConfirmed}
        >
          <Text>{alternativeText}</Text>
        </Pressable>;
      })};
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
    color: 'white',
  },
  rightAlternative: {
    backgroundColor: 'green',
    color: 'white',
  },
  wrongAlternative: {
    backgroundColor: 'red',
    color: 'white',
  }
});