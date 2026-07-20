import { useColors } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface PercentageBarProps {
    progress: number;
    height?: number;
    color?: string;
    style?: ViewStyle;
}

export default function PercentageBar({
  progress,
  height = 16,
  color,
  style,
}: PercentageBarProps) {
  const colors = useColors();
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, { height, backgroundColor: colors.border }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color
          }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 99,
  },
});
