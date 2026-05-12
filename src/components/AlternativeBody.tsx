import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, vw } from '../styles/globals';
import { useEffect, useState } from 'react';

export default function AlternativeBody({ alternatives, choose, onChoose }: { alternatives: string[], choose: (choice: number) => void, onChoose: number }) {

  const [chosen, setChosen] = useState<number>(-1);

  useEffect(() => {
    chosenStyle(onChoose);
  }, [onChoose]);

  const chosenStyle = (choice: number) => {
    setChosen(choice - 1);
  };

  return (
    <View style={styles.container}>
      {alternatives.map((alternativeText: string, choice: number) => {
        return <Pressable
          onPress={() => choose(choice + 1)}
          style={
            ({ pressed }) => [styles.alternative, { backgroundColor: chosen === choice ? colors.selected : pressed ? colors.selected : colors.surface }]
          }
          key={choice}
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
    backgroundColor: "none",
  },
  questionImage: {
    width: 180,
    height: 180,
  },
  alternative: {
    backgroundColor: "none",
    width: 70 * vw,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: colors.border,
  }
});