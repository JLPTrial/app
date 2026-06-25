import { colors } from '@/styles/globals';
import { Switch } from 'react-native-switch';

type SwitchProps = {
  value: boolean,
  onChange: (value: boolean) => void,
}

export function AppSwitch({ value, onChange }: SwitchProps) {
  return (
    <Switch
      value={value}
      onValueChange={(value) => onChange(value)}
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