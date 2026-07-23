import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { SessionResult } from '@/types/types';
import { router } from 'expo-router';
import BottomButton from './pressable/BottomButton';
import ResultCard from './ResultCard';

export default function EndScreen({ result }: { result: SessionResult }) {
  const percentage = result.questionCount.total > 0 ? Math.round((result.right.total / result.questionCount.total) * 100) : 0;

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
