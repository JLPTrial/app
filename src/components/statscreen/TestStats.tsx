import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useStorage } from '@/hooks/useStorage';
import AppLineGraph from '../graphs/AppLineGraph';
import { useQuestions } from '@/db/queries';
import { useEffect, useState } from 'react';
import { ExamStats } from '@/types/types';

export default function TestStats(){
  const { data } = useStorage();
  const level = data.jlptLevel;
  const db = useQuestions(level);

  const [stats, setStats] = useState<ExamStats | null>(null);

  useEffect(() => {
    const numAttempts : number = 5;
    (async () => {
      const stats = await db.getAttemptStats(numAttempts);
      setStats(stats);
      console.log(stats);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!stats || stats.answers.length === 0) return null;

  return (
    <Screen internal>
      <AppText>Simulados de nível {level}</AppText>
      <AppLineGraph
        values={stats['answers']}
        maxValue={100}/>
    </Screen>
  );
}
