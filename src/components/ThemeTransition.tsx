import { useStorage } from '@/hooks/useStorage';
import { ColorScheme, darkColors, lightColors } from '@/styles/globals';
import { Storage } from 'expo-sqlite/kv-store';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Appearance, StyleSheet, View } from 'react-native';

const ThemeDisplayContext = createContext<ColorScheme | null>(null);

function getPreContextColors(): ColorScheme {
  try {
    const stored = Storage.getItemSync('isDarkMode');
    if (stored !== null) {
      return JSON.parse(stored) ? darkColors : lightColors;
    }
  } catch {}
  return Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;
}

export function useDisplayColors(): ColorScheme {
  const contextColors = useContext(ThemeDisplayContext);
  return contextColors ?? getPreContextColors();
}

export default function ThemeTransition({ children }: PropsWithChildren) {
  const { data } = useStorage();
  const isDarkMode = data.isDarkMode;
  const resolveColors = useCallback((dark: boolean) => dark ? darkColors : lightColors, []);

  const [displayedColors, setDisplayedColors] = useState<ColorScheme>(() => resolveColors(isDarkMode));
  const [overlayColor, setOverlayColor] = useState<string | null>(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const prevIsDarkMode = useRef(isDarkMode);

  useEffect(() => {
    if (prevIsDarkMode.current === isDarkMode) return;
    prevIsDarkMode.current = isDarkMode;

    setOverlayColor(displayedColors.background);
    setDisplayedColors(resolveColors(isDarkMode));
    overlayOpacity.setValue(1);

    Animated.timing(overlayOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
      .start(({ finished }) => {
        if (finished) setOverlayColor(null);
      });
  }, [isDarkMode, overlayOpacity, resolveColors, displayedColors.background]);

  return (
    <ThemeDisplayContext.Provider value={displayedColors}>
      <View style={{ flex: 1, backgroundColor: displayedColors.background }}>
        {children}
        {overlayColor && (
          <Animated.View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor, opacity: overlayOpacity }]}
          />
        )}
      </View>
    </ThemeDisplayContext.Provider>
  );
}
