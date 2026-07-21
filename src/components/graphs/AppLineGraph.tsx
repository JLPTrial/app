import { LineChart } from "react-native-gifted-charts";
import { colors, vw } from '@/styles/globals';
import { useState } from "react";

type AppLineGraphProps = {
  values1: number[],
  xAxisLabelTexts: string[],
  onFocus?: (item: number, index: number) => void,
  values2?: number[],
  yAxisLabelTexts?: string[],
  yAxisLabelSuffix?: string,
}

const none = () => {};

export default function AppLineGraph({ values1, xAxisLabelTexts, onFocus = none, values2 = [], yAxisLabelTexts, yAxisLabelSuffix = "%" }: AppLineGraphProps) {
  const [showData1, setShowData1] = useState<boolean>(true);
  const data1 = values1.map((value) => { return { value: value }; });
  const data2 = values2.map((value) => { return { value: value }; });
  return <LineChart
    data={data1}
    data2={data2}
    xAxisLabelTexts={xAxisLabelTexts}
    color1={showData1 ? colors.primaryLight : colors.textMuted}
    color2={showData1 ? colors.textMuted : colors.primaryLight}
    dataPointsColor={colors.primary}
    sectionColors={Array(6).fill([colors.backgroundDim,colors.background]).flat()}
    dataPointsWidth1={10}
    thickness={3}
    onBackgroundPress={() => { if(values2.length > 0) setShowData1((value) => !value);}}
    focusEnabled={onFocus !== none}
    dataPointsRadius={5}
    focusProximity={300}
    onFocus={(item: number, index: number) => onFocus(item, index)}
    isAnimated={true}
    maxValue={100}
    width={80 * vw}
    adjustToWidth={true}
    disableScroll={true}
    yAxisLabelTexts={yAxisLabelTexts}
    yAxisLabelSuffix={yAxisLabelSuffix}
  />;
}