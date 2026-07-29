import { useDisplayColors } from '@/components/ThemeTransition';
import { useStorage } from './useStorage';

export const useColors = () => useDisplayColors();

type UseThemeReturn = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const useTheme = (): UseThemeReturn => {
  const { data, setValue } = useStorage();

  return {
    isDarkMode: data.isDarkMode,
    setIsDarkMode: (value: boolean) => setValue('isDarkMode', value),
  };
};
