import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { useQuestions } from '@/db/queries';
import { useStorage } from '@/hooks/useStorage';
import { SessionResult } from '@/types/types';
import { router } from 'expo-router';
import BottomButton from './pressable/BottomButton';
import ResultCard from './ResultCard';

export default function ExamEndScreen({ result, startedAt }: { result: SessionResult, startedAt : number }) {
  const { data } = useStorage();
  const level = data.jlptLevel;

  const percentage = result.total.total > 0 ? Math.round((result.right.total / result.total.total) * 100) : 0;
  const feedbackText =
        percentage >= 90 ? 'おめでとう! Desempenho excelente.' :
          percentage >= 70 ? 'Ótimo desempenho!' :
            percentage >= 50 ? 'Boa tentativa!' :
              'Lembre-se de sempre revisar os seus erros!';

  const approved = (result.right.total > 35 && result.right.listening > 4 && result.right.total - result.right.listening > 20);

  const resultText = approved ?
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

  const db = useQuestions(level);

  db.insertExam(result.right.total, result.total.total, result.right.total, startedAt, approved, level);

  return (
    <Screen>
      <AppText variant='title'>
                Sessão Concluída!
      </AppText>

      {
        sections.map(({key, label}) =>
          <ResultCard 
            key={key}
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