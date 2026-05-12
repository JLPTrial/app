import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, vw } from '../styles/globals';

export default function AlternativeBody({ alternatives }: { alternatives: string[] }) {
  return (
    <View style={styles.container}>
      {alternatives.map((alternative: string, i: number) => {
        return <Pressable
          style={({ pressed }) => [styles.alternative, { backgroundColor: pressed ? colors.selected : colors.surface }]}
          key={i}
        >
          <Text>{alternative}</Text>
        </Pressable>
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