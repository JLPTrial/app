import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/types/types';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';
import { colors, vh } from '@/styles/globals';

export default function QuestionBody({ question }: { question: Question }) {

  const type: string = question.type;

  return (
    <View style={styles.container}>
      <View style={[styles.questionHeader, { backgroundColor: colors[type] }]}>
        <Text style={{ color: '#fff' }}> {type}  - Nº {question.id} </Text>
      </View>
      <Text style={styles.questionCommand}>{question.command}</Text>
      {(question.image !== null) &&
        (<Image
          source={assetsMap[`${question.image}`]}
          style={styles.questionImage}
          contentFit="contain"
        />)}
      {(question.contextualText !== null) && (question.audio === null) && (<Text>{question.contextualText}</Text>)}
      {(question.audio !== null) && (<AudioPlayer source={assetsMap[`${question.audio}`]} />)}
      {(question.type !== 'listening') && (<Text style={styles.questionText}> {question.text}</Text>)
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionHeader: {
    marginBottom: 1 * vh,
    borderRadius: 999,
  },
  questionCommand: {
    marginBottom: 1 * vh,
  },
  questionText: {
    backgroundColor: 'pink',
    padding: 6,
    marginTop: 1 * vh,
  },
  questionImage: {
    height: 25 * vh,
    aspectRatio: 16 / 9,
    marginBottom: 1 * vh,
  },
});