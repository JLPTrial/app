import { assetsMap } from '@/constants/assetsMap';
import { Question } from '@/types/types';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import AudioPlayer from '../AudioPlayer';
import { colors, vh, vw } from '@/styles/globals';
import { AppText } from '../texts/AppText';
import Statement from '../texts/Statement';

export default function QuestionBody({ question }: { question: Question }) {

  const type: string = question.type;

  return (
    <View style={styles.container}>
      <View style={[styles.questionHeader, { backgroundColor: colors[type as keyof typeof colors] }]}>
        <AppText style={{ color: colors.textLight }} center={true}> {type.charAt(0).toUpperCase() + type.slice(1)}  - Nº  {question.id} </AppText>
      </View>
      <Statement statement={question.command} style={styles.questionCommand} />
      {(question.image !== null) &&
        (<Image
          source={assetsMap[`${question.image}`]}
          style={styles.questionImage}
          contentFit="contain"
        />)}
      {(question.contextualText !== null) && (question.audio === null) && (<Statement statement={question.contextualText} />)}
      {(question.audio !== null) && (<AudioPlayer source={assetsMap[`${question.audio}`]} />)}
      {question.type !== 'listening' && (
        <View style={styles.questionTextContainer}>
          <Statement statement={question.text} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2 * vh,
    alignItems: 'center'
  },
  questionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
  },
  questionCommand: {
    fontSize: 15,
    color: colors.textMuted,
  },
  questionTextContainer: {
    borderColor: colors.primaryLight,
    borderStyle: 'dotted',
    borderWidth: 1 * vw,
    padding: 2 * vw,
    borderRadius: 10,
  },
  questionImage: {
    height: 25 * vh,
    aspectRatio: 16 / 9,
  },
});