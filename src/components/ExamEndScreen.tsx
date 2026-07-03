import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { colors } from '@/styles/globals';
import { SessionResult } from '@/types/types';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import BottomButton from './pressable/BottomButton';
import ResultCard from './ResultCard';

export default function EndScreen({ result }: { result: SessionResult }) {
    const percentage = result.total.total > 0 ? Math.round((result.right.total / result.total.total) * 100) : 0;
    const scoreColor =
        percentage >= 70 ? colors.success :
          percentage >= 50 ? colors.mid :
            colors.failure;
    const feedbackText =
        percentage >= 90 ? 'おめでとう! Desempenho excelente.' :
          percentage >= 70 ? 'Ótimo desempenho!' :
            percentage >= 50 ? 'Boa tentativa!' :
              'Lembre-se de sempre revisar os seus erros!';

    const resultText = (result.right.total > 35 && result.right.listening > 4 && result.right.total - result.right.listening > 20) ?
            "Aprovado!" : 
            "Reprovado...";
    const sections = [
        { key: 'total', label: 'Total' },
        { key: 'kanji', label: 'Kanji' },
        { key: 'vocabulary', label: 'Vocabulary' },
        { key: 'grammar', label: 'Grammar' },
        { key: 'reading', label: 'Reading' },
        { key: 'listening', label: 'Listening'}
    ] as const;

  return (
    <Screen>
      <AppText variant='title'>
                Sessão Concluída!
      </AppText>

      {
        sections.map(({key, label}) =>
        <ResultCard 
            label={label} 
            right={result.right[key]} 
            total={result.total[key]}/>
        )
      }

      <AppText center={true}>
        {resultText}
        {feedbackText}
      </AppText>

      <BottomButton onPress={() => router.dismissAll()} text="Voltar ao Início" />
    </Screen>);
}
const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: colors.successBlock,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 8,
  },
  scoreText: {
    fontSize: 48,
  },
  percentageText: {
    fontSize: 24,
  },
});
