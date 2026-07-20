import { RadarChart } from "react-native-gifted-charts";
import { colors, vw } from '@/styles/globals';

type AppRadarGraphProps = {
  values: number[],
  labels: string[],
  maxValue?: number,
  areaColor?: string,
}

export default function AppRadarGraph({ values, labels, areaColor = colors.primary, maxValue = 1 }: AppRadarGraphProps) {
  return <RadarChart
    data={values}
    maxValue={maxValue}
    labels={labels}
    chartContainerProps={{
      width: 100 * vw,
      shiftX: 10 * vw,
    }}
    gridConfig={{
      stroke: 'transparent',
      strokeWidth: 1,
      gridSections: [
        { fill: colors.backgroundDim, gradientColor: colors.backgroundDim },
        { fill: colors.background, gradientColor: colors.background },
        { fill: colors.backgroundDim, gradientColor: colors.backgroundDim },
        { fill: colors.background, gradientColor: colors.background },
        { fill: colors.backgroundDim, gradientColor: colors.backgroundDim },
      ],
    }}
    polygonConfig={{
      fill:areaColor,
      strokeWidth: 0,
    }}
    noOfSections={5}
    startAngle={18}
  />;
}