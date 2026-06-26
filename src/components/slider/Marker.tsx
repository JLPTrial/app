import { colors } from "@/styles/globals";
import { StyleSheet, View } from 'react-native';

export type MarkerType =  keyof typeof Marker;

type dotProps = {
  index: number,
  currentValue: number, 
  borderColor: string,
}

const dot = ({ index, currentValue, borderColor = colors.background}: dotProps) => {
  return <View
    style={[styles.dot, {
      backgroundColor: (index <= currentValue) ? colors.primary : colors.textMuted,
      borderColor: borderColor,
    }]}
  />;
};

const none = () => <View />;

export const Marker = { dot, none };

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 4,
  }
});