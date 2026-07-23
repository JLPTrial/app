import { RadarChart } from "react-native-gifted-charts";
import { vw } from '@/styles/globals';
import { useColors } from '@/hooks/useTheme';

type AppRadarGraphProps = {
  values: number[],
  labels: string[],
  areaColor: string,
  maxValue?: number,
}

export default function AppRadarGraph({ values, labels, areaColor, maxValue = 1 }: AppRadarGraphProps) {
  const colors = useColors();
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
    labelConfig={{stroke: colors.textDark, fontWeight: 'bold'}}
    polygonConfig={{
      fill:areaColor,
      strokeWidth: 0,
    }}
    noOfSections={5}
    startAngle={18}
  />;
}