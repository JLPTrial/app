import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/db/queries';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';

export default function QuestionBody({ question }: { question: Question }) {
 
  const type: string = question.type;

  return (
    <View style={styles.container}>
      <View style={[styles.questionHeader, { backgroundColor: typeColors[type] }]}>
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

const typeColors: Record<string, string> = {
  grammar: '#a2a',
  vocabulary: '#d22',
  reading: '#2b7',
  hearing: '#cc3',
  listening: '#3ac',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'none',
    alignItems: 'center'
  },
  questionHeader: {
    marginBottom: 8,
    borderRadius: 999
  },
  questionCommand: {
    marginBottom: 8
  },
  questionText: {
    backgroundColor: 'pink',
    padding: 6,
    marginTop: 8
  },
  questionImage: {
    height: 160,
    aspectRatio: 16 / 9,
    marginBottom: 8
  },
});