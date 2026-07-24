import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useStorage } from '@/hooks/useStorage';
import AppLineGraph from '../graphs/AppLineGraph';
import { useQuestions } from '@/db/queries';
import { useEffect, useState } from 'react';
import { ExamStats } from '@/types/types';
import AppTable from '../graphs/AppTable';

export default function TestStats(){
  const { data } = useStorage();
  const level = data.jlptLevel;
  const db = useQuestions(level);

  const [stats, setStats] = useState<ExamStats[] | null>(null);

  useEffect(() => {
    const numAttempts : number = 5;
    (async () => {
      const stats : ExamStats[] | null = await db.getAttemptStats(numAttempts);
      setStats(stats);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!stats) return null;

  return (
    <Screen internal>
      <AppText>Simulados de nível {level}</AppText>
      <AppLineGraph
        values={stats.map(exam => exam.score)}
        maxValue={100}/>
    </Screen>
  );
}
