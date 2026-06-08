import { AppText } from '@/components/texts/AppText';
import { colors } from '@/styles/globals';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const BottomButton = ({ onPress, text }: { onPress: () => void; text: string }) => {
  return (
    <View style={styles.footer}>
      <Pressable style={styles.startButton} onPress={onPress}>
        <AppText variant="title" style={styles.buttonText}>
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