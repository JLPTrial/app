import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/db/queries';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';

export default function QuestionBody({ question }: { question: Question }) {
  // Variable that decides if shows audio or its transcription
  const accessibility = false;


  const type: string = question.type;
  return (
    <View style={styles.container}>
      <Text style={styles.questionHeader}>
        <Text style={{ backgroundColor: typeColors[type], color: '#fff' }}> {type}</Text>
        - Nº {question.id}
      </Text>
      <Text style={styles.questionStatement}>{question.statement}</Text>
      {(question.image != null) ?
        <Image
          source={assetsMap[`${question.image}`]}
          style={styles.questionImage}
          contentFit="contain"
        /> : null}
      {(question.audio == null) ? null :
        (accessibility) ?
          <Text> {question.contextualText}</Text> :
          <AudioPlayer source={assetsMap[`${question.audio}`]} />
      }
      <Text style={styles.questionText}> {question.text}</Text>
    </View>
  );
}

const typeColors = {
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
  },
  questionStatement: {
    marginBottom: 8
  },
  questionText: {
    backgroundColor: 'pink',
    padding: 6,
    marginTop: 8
  },
  questionImage: {
    width: 'auto',
    height: 180,
    marginBottom: 8
  },
});