import { LineChart } from "react-native-gifted-charts";
import { vw } from '@/styles/globals';
import { useColors } from '@/hooks/useTheme';

type AppLineGraphProps = {
  values: number[],
  xLabels: string[],
  maxValue: number,
  yLabels?: string[],
  yLabelsSulfix?: string,
  onBackgroundPress?: () => void,
}

export default function AppLineGraph({ values, xLabels, maxValue = 100, yLabels, yLabelsSulfix = "%", onBackgroundPress}: AppLineGraphProps) {
  const colors = useColors();
  const data = values.map((value) => { return { value: value }; });

  return <LineChart
    data={data}
    xAxisLabelTexts={xLabels}
    yAxisLabelTexts={yLabels}
    yAxisLabelSuffix={yLabelsSulfix}
    maxValue={maxValue}
    onBackgroundPress={onBackgroundPress}
    color={colors.primaryLight}
    dataPointsColor={colors.primary}
    sectionColors={Array(6).fill([colors.backgroundDim,colors.background]).flat()}
    dataPointsWidth={10}
    thickness={3}
    dataPointsRadius={5}
    width={80 * vw}
    animateOnDataChange
    isAnimated
    adjustToWidth
    disableScroll
  />;
}