import { useStorage } from '@/hooks/useStorage';
import { ColorScheme, darkColors, lightColors } from '@/styles/globals';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

const ThemeDisplayContext = createContext<ColorScheme>(lightColors);

export function useDisplayColors(): ColorScheme {
  return useContext(ThemeDisplayContext);
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
      <Animated.View style={{ flex: 1, opacity }}>
        {children}
      </Animated.View>
    </ThemeDisplayContext.Provider>
  );
}
