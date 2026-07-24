import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useStorage } from '@/hooks/useStorage';
import AppLineGraph from '../graphs/AppLineGraph';
import { useQuestions } from '@/db/queries';
import { useCallback, useState } from 'react';
import { ExamStats } from '@/types/types';
import AppTable from '../graphs/AppTable';
import { secondsToTimer } from '@/utils/parsers';
import { useFocusEffect } from 'expo-router';

const formatToTable = (stats : ExamStats[]) =>{
  const formattedStats = new Array();
  for (const stat of stats) {
    const formattedApproved = (stat.approved) ? 'Sim' : 'Não';
    const formattedScore = `${stat.score.toFixed(1)}%`;
    const formattedDuration = (stat.duration === 0) ? '-' : secondsToTimer(Math.floor(stat.duration*60)) ;
    formattedStats.push({
      approved : formattedApproved,
      score: formattedScore,
      duration: formattedDuration
    });
  }
  return formattedStats;
};

export default function TestStats(){
  const { data } = useStorage();
  const level = data.jlptLevel;

  const [stats, setStats] = useState<ExamStats[] | null>(null);

  const db = useQuestions(level);

  useFocusEffect(
    useCallback(() => {
      const numAttempts : number = 5;
      const fetch = async () => {
        const stats : ExamStats[] | null = await db.getAttemptStats(numAttempts);
        setStats(stats);
      };
      fetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level])
  );

  if (!stats || stats.length === 0) return <AppText center>Faça um simulado no nível {level} para ver suas estatísticas</AppText>;

  return (
    <Screen internal>
      <AppText center variant='title'>Taxa de Acertos dos últimos simulados {level}</AppText>
      <AppLineGraph
        values={stats.map(exam => exam.score)}
        maxValue={100}/>

      <AppText center>Tabela dos últimos simulados {level}</AppText>
      {(stats.length > 0) && <AppTable header={['Aprovado','Acertos','Tempo']} data={formatToTable(stats)}/>}
    </Screen>
  );
}
