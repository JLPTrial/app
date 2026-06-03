import PercentageBar from '@/components/PercentageBar';
import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { colors } from '@/styles/globals';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BottomButton from './BottomButton';

type SessionResult = {
    right: number;
    total: number;
};

export default function EndScreen({ result }: { result: SessionResult }) {
  const percentage = result.total > 0 ? Math.round((result.right / result.total) * 100) : 0;
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

      <View style={styles.resultCard}>
        <AppText style={{ color: colors.textMuted }}>Questões corretas</AppText>
        <AppText bold={true} style={[styles.scoreText, { color: scoreColor }]}>
          {result.right}/{result.total}
        </AppText>
        <AppText style={[styles.percentageText, { color: scoreColor }]}>
          {percentage}%
        </AppText>

        <PercentageBar
          progress={percentage}
          color={scoreColor}
        />
      </View>

      <AppText center={true}>
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
