import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { Question } from '@/db/queries';
import { assetsMap } from '@/constants/assetsMap';
import AudioPlayer from './AudioPlayer';

export default function QuestionBody({ question }: { question: Question }) {
  // Variable that decides if shows audio or its transcription
  const accessibility = false;

  const type = question.type;
  return (
    <View style={styles.container}>
      <Text style={styles.questionHeader}>
        <Text style={{ backgroundColor: typeColors[type], color: '#fff' }}> {type}</Text>
        - Questão Nº {question.id}
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
    marginBottom: 10,
  },
  questionStatement: {
    marginBottom: 10
  },
  questionText: {
    backgroundColor: 'pink',
    padding: 6,
    marginTop: 10
  },
  questionImage: {
    width: 'auto',
    height: 180,
    marginBottom: 10
  },
});