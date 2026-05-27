import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/types/types';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';
import { colors, vh, vw } from '@/styles/globals';
import { AppText } from '../texts/AppText';

export default function QuestionBody({ question }: { question: Question }) {

  const type: string = question.type;

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={[styles.questionHeader, { backgroundColor: colors[type as keyof typeof colors] }]}>
        <AppText style={{ color: '#fff' }} center={true}> {type}  - Nº {question.id} </AppText>
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
  questionHeader: {
    width: 50 * vw,
    marginBottom: 1 * vh,
    borderRadius: 999,
  },
  questionCommand: {
    marginBottom: 1 * vh,
  },
  questionText: {
    borderColor: 'pink',
    borderStyle: 'solid',
    borderWidth: 1 * vw,
    padding: 2 * vw,
    marginTop: 1 * vh,
  },
  questionImage: {
    height: 25 * vh,
    aspectRatio: 16 / 9,
    marginBottom: 1 * vh,
  },
});