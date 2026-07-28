import { HapticFeedback, useHaptics } from '@/hooks/useHaptics';
import { useColors } from '@/hooks/useTheme';
import { Switch } from 'react-native-switch';

type SwitchProps = {
  value: boolean,
  onChange: (value: boolean) => void,
  haptics?: HapticFeedback,
}

export function AppSwitch({ value, onChange, haptics = 'selection' }: SwitchProps) {
  const colors = useColors();
  const hapticFeedback = useHaptics();

  const handleValueChange = (value: boolean) => {
    if (haptics !== 'none') hapticFeedback[haptics]();
    onChange(value);
  };

  return (
    <Switch
      value={value}
      onValueChange={handleValueChange}
      circleSize={32}
      barHeight={40}
      circleBorderWidth={0}
      backgroundInactive={colors.textMuted}
      circleInActiveColor={colors.background}
      backgroundActive={colors.primaryLight}
      circleActiveColor={colors.primary}
      changeValueImmediately={true}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={1.1}
      switchRightPx={1.1}
      switchWidthMultiplier={3}
    />
  );
}