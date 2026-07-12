import { useStorage } from '@/hooks/useStorage';
import { ColorScheme, darkColors, lightColors } from '@/styles/globals';
import { Storage } from 'expo-sqlite/kv-store';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Appearance } from 'react-native';

const ThemeDisplayContext = createContext<ColorScheme | null>(null);

function getPreContextColors(): ColorScheme {
  try {
    const stored = Storage.getItemSync('theme');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed === 'dark') return darkColors;
      if (parsed === 'light') return lightColors;
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
  const theme = data.theme;
  const resolveColors = useCallback((t: typeof theme) => t === 'dark' ? darkColors : lightColors, []);

  const [displayedColors, setDisplayedColors] = useState<ColorScheme>(() => resolveColors(theme));
  const opacity = useRef(new Animated.Value(1)).current;
  const prevTheme = useRef(theme);

  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;

    Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true })
      .start(({ finished }) => {
        if (!finished) return;
        setDisplayedColors(resolveColors(theme));
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }).start();
      });
  }, [theme, opacity, resolveColors]);

  return (
    <ThemeDisplayContext.Provider value={displayedColors}>
      <Animated.View style={{ flex: 1, opacity, backgroundColor: displayedColors.background }}>
        {children}
      </Animated.View>
    </ThemeDisplayContext.Provider>
  );
}
