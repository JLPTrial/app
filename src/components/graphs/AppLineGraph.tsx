import { LineChart } from "react-native-gifted-charts";
import { vw } from '@/styles/globals';
import { useColors } from '@/hooks/useTheme';

type AppLineGraphProps = {
  values: number[],
  xLabels?: string[],
  maxValue: number,
  yLabels?: string[],
  yLabelsSuffix?: string,
  onBackgroundPress?: () => void,
}

export default function AppLineGraph({ values, xLabels = [], maxValue = 100, yLabels, yLabelsSuffix = "%", onBackgroundPress}: AppLineGraphProps) {
  const colors = useColors();
  const data = values.map((value) => { return { value: value, dataPointText: value.toFixed(1) }; });

  return <LineChart
    data={data}
    xAxisLabelTexts={xLabels}
    yAxisLabelTexts={yLabels}
    yAxisLabelSuffix={yLabelsSuffix}
    maxValue={maxValue}
    onBackgroundPress={onBackgroundPress}

    color={colors.primaryLight}
    dataPointsColor={colors.primary}
    sectionColors={Array(6).fill([colors.backgroundDim,colors.background]).flat()}
    yAxisTextStyle={{ color: colors.textLight }}
    textColor={colors.textLight}

    thickness={3}
    width={80 * vw}
    dataPointsWidth={10}
    dataPointsRadius={5}
    roundToDigits={0}
    stepValue={10}
    textFontSize={14}
    textShiftY={-10}

    animateOnDataChange
    isAnimated
    adjustToWidth
    disableScroll
  />;
}