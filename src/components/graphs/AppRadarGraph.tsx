import { RadarChart } from "react-native-gifted-charts";
import { colors } from '@/styles/globals';

export default function AppRadarGraph({values, labels, maxValue = 1} : {values: number[], labels: string[], maxValue?: number}){
  return <RadarChart
    data={values}
    maxValue={maxValue}
    labels={labels}
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
    noOfSections={5}
    startAngle={18}
  />;
}