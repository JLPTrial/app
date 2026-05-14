import { useEffect, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, vw } from '../../styles/globals';

export default function AlternativeBody({ alternatives, answer, choose, onChoose, ref }: { alternatives: string[], answer: number, choose: (choice: number) => void, onChoose: number, ref: any }) {

  const [choice, setChoice] = useState<number>(-1);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  useImperativeHandle(ref, () => {
    return {
      confirmAlternative() {
        setIsConfirmed(true);
      },
      reset() {
        setChoice(-1);
        setIsConfirmed(false);
      }
    };
  }, []);

  useEffect(() => {
    setChoice(onChoose);
  }, [onChoose]);


  const handlePressableStyle = (alternative: number, pressed: boolean) => {
    if (!isConfirmed) {
      if (pressed || alternative === choice) {
        return styles.pressed;
      }
      return styles.default;
    }

    if (alternative === answer) {
      return styles.rightAlternative;
    }
    if (alternative === choice && choice !== answer) {
      return styles.wrongAlternative;
    }
    return styles.disabled;
  };

  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, alternative: number) => {
        return <Pressable
          onPress={() => { choose(alternative); }}
          style={
            ({ pressed }) => [styles.alternative, handlePressableStyle(alternative, pressed)]
          }
          key={alternative}
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