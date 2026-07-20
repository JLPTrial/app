import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { RadarChart } from "react-native-gifted-charts";
import { useEffect, useState } from 'react';
import { useQuestions } from '@/db/queries';
import { colors } from '@/styles/globals';

export default function TopicStats() {
  const [chartData, setChartData] = useState<number[] | null>(null);
  const db = useQuestions('N5');
  useEffect(() => {
    (async () => {
      const data = await db.getStats();
      console.log(data);
      setChartData(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!chartData || chartData.length === 0) return null;
  return (
    <Screen internal>
      <AppText>Tópicos</AppText>
      <RadarChart
        data={chartData}
        maxValue={1}
        labels={['kanji', 'listening', 'reading', 'vocabulary', 'grammar']}
        gridConfig={{
          stroke: 'transparent',
          strokeWidth: 1,
          gridSections: [
            { fill: colors.primary, gradientColor: colors.primary },
            { fill: colors.background, gradientColor: colors.background },
            { fill: colors.primary, gradientColor: colors.primary },
            { fill: colors.background, gradientColor: colors.background },
            { fill: colors.primary, gradientColor: colors.primary },
          ],
        }}
        noOfSections={5}
        startAngle={18}
      />
    </Screen>
  );
}