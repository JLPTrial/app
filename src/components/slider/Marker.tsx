import { colors } from "@/styles/globals";
import { StyleSheet, View } from 'react-native';

const dot = ({ index, currentValue }: { index: number, currentValue: number }) => {
  return <View
    style={[styles.dot, {
      backgroundColor: (index <= currentValue) ? colors.primary : colors.textMuted,
      borderWidth: 4,
      borderColor: '#FFF',
    }]}
  />;
};

const none = () => <View />;

export const Marker = { dot, none };

export type MarkerType =  keyof typeof Marker;

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 999,
  }
});