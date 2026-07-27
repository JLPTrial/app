import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { useStorage } from './useStorage';

export type HapticFeedback = 'light' | 'medium' | 'success' | 'error' | 'selection' | 'none';

type UseHapticsReturn = Record<Exclude<HapticFeedback, 'none'>, () => void>;

export const useHaptics = (): UseHapticsReturn => {
  const { data } = useStorage();
  const enabled = data.hapticFeedback;

  const light = useCallback(() => {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [enabled]);

  const medium = useCallback(() => {
    if (enabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [enabled]);

  const success = useCallback(() => {
    if (enabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [enabled]);

  const error = useCallback(() => {
    if (enabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, [enabled]);

  const selection = useCallback(() => {
    if (enabled) Haptics.selectionAsync();
  }, [enabled]);

  return { light, medium, success, error, selection };
};
