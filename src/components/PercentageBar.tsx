import { colors } from '@/styles/globals';
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
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.container, { height }, style]}>
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
    backgroundColor: colors.border,
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 99,
  },
});