import { useDisplayColors } from '@/components/ThemeTransition';
import { Theme } from '@/contexts/StorageContext';
import { useStorage } from './useStorage';

type UseThemeReturn = {
  colors: ReturnType<typeof useDisplayColors>;
  isDarkMode: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = (): UseThemeReturn => {
  const { data, setValue } = useStorage();
  const colors = useDisplayColors();
  const isDarkMode = data.theme === 'dark';

  return {
    colors,
    isDarkMode,
    theme: data.theme,
    setTheme: (t: Theme) => setValue('theme', t),
  };
};
