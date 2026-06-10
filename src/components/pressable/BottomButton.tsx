import { AppText } from '@/components/texts/AppText';
import { colors } from '@/styles/globals';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

interface BottomButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  toFlex?: boolean;
}

const BottomButton = ({ onPress, text, disabled, style, textStyle, toFlex=true }: BottomButtonProps) => {
  return (
    <View style={[styles.footer, !toFlex && { flex: 0 }]}>
      <Pressable 
        style={[styles.startButton, style]} 
        onPress={onPress}
        disabled={disabled}
      >
        <AppText variant="title" style={[styles.buttonText, textStyle]} center={true}>
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
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textLight,
  },
});

export default BottomButton;