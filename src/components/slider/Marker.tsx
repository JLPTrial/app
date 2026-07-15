import { colors } from "@/styles/globals";
import { StyleSheet, View } from 'react-native';

export type MarkerType = keyof typeof Marker;

type DotProps = {
  index: number,
  currentValue: number,
  borderColor?: string,
}

const Dot = ({ index, currentValue, borderColor = colors.background}: DotProps) => {
  return <View
    style={[styles.dot, {
      backgroundColor: (index <= currentValue) ? colors.primary : colors.textMuted,
      borderColor: borderColor,
    }]}
  />;
};

const None = () => <View />;

export const Marker = { Dot, None };

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 4,
  }
});