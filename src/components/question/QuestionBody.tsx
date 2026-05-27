import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/types/types';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';
import { colors, vh } from '@/styles/globals';
import { AppText } from '../texts/AppText';

export default function QuestionBody({ question }: { question: Question }) {

  const type: string = question.type;

  return (
    <View style={styles.container}>
      <View style={[styles.questionHeader, { backgroundColor: colors[type as keyof typeof colors] }]}>
        <AppText style={{ color: '#fff' }}> {type}  - Nº {question.id} </AppText>
      </View>
      <AppText style={styles.questionCommand}>{question.command}</AppText>
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