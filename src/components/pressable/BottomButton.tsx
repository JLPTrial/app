import { AppText } from '@/components/texts/AppText';
import { HapticFeedback, useHaptics } from '@/hooks/useHaptics';
import { useColors } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

interface BottomButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  toFlex?: boolean;
  haptic?: HapticFeedback;
}

const BottomButton = ({ onPress, text, disabled, style, textStyle, toFlex=true, haptic='light' }: BottomButtonProps) => {
  const colors = useColors();
  const haptics = useHaptics();

  const handlePress = () => {
    if (haptic !== 'none') haptics[haptic]();
    onPress();
  };

  return (
    <View style={[styles.footer, !toFlex && { flex: 0 }]}>
      <Pressable
        style={[styles.startButton, { backgroundColor: colors.primary }, style]}
        onPress={handlePress}
        disabled={disabled}
      >
        <AppText variant="title" style={[{ color: colors.textLight }, textStyle]} center={true}>
          {text}
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginTop: 16,
  },
  startButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default BottomButton;