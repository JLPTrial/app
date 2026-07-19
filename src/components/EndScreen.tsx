import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { useColors } from '@/hooks/useTheme';
import { SessionResult } from '@/types/types';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import BottomButton from './pressable/BottomButton';
import ResultCard from './ResultCard';

export default function EndScreen({ result }: { result: SessionResult }) {
  const colors = useColors();
  const percentage = result.questionCount.total > 0 ? Math.round((result.right.total / result.questionCount.total) * 100) : 0;
  const scoreColor =
        percentage >= 70 ? colors.success :
          percentage >= 50 ? colors.mid :
            colors.failure;
  const feedbackText =
        percentage >= 90 ? 'おめでとう! Desempenho excelente.' :
          percentage >= 70 ? 'Ótimo desempenho!' :
            percentage >= 50 ? 'Boa tentativa!' :
              'Lembre-se de sempre revisar os seus erros!';

  return (
    <Screen>
      <AppText variant='title'>
                Sessão Concluída!
      </AppText>

      <ResultCard label={''} right={result.right.total} total={result.questionCount.total}/>

      <AppText center={true}>
        {feedbackText}
      </AppText>

      <BottomButton onPress={() => router.dismissAll()} text="Voltar ao Início" />
    </Screen>);
}
const styles = StyleSheet.create({
  resultCard: {
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
