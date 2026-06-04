import { colors } from '@/styles/globals';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { StyleSheet, View } from 'react-native';
import { AppText } from './texts/AppText';
import { Switch } from 'react-native-switch';

type icon = keyof typeof Ionicons.glyphMap;

type SliderProps = {
  title: string,
  value: number,
  onChange: () => void,
  min: number,
  step: number,
  max: number,
  left: React.ComponentType,
  right: any
};

const dot = ({ index, currentValue }: { index: number, currentValue: number }) => {
  return <View
    style={[styles.dot, {
      backgroundColor: (index <= currentValue) ? colors.primary : colors.textMuted,
      borderWidth: 4,
      borderColor: colors.background,
    }]}
  />;
};

export function SwitchSetting({ icon, title, value, onChange }: { icon: icon, title: string, value: boolean, onChange: () => void }) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Ionicons
        name={icon}
        size={32}
        color={colors.textDark}
      />
      <AppText>{title}</AppText>
      <Switch
        value={value} onValueChange={onChange}
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
    </View>
  );
}

export function SliderSetting({ title, value, onChange, min, step, max, left, right }: SliderProps) {
  return (
    <View>
      <AppText center>{title}</AppText>
      <View style={[styles.container, styles.horizontal]}>
        {left}
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={onChange}
          minimumTrackTintColor={colors.primaryLight}
          maximumTrackTintColor={colors.textMuted}
          StepMarker={dot}
          thumbSize={20}
          thumbTintColor={colors.background}
          style={{ flex: 1, height: 0 }}
        />
        {right}
      </View>
    </View>
  );
}

export function ActionSetting({ icon, title }: { icon: icon, title: string }) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Ionicons
        name={icon}
        size={32}
        color={colors.textDark}
      />
      <AppText style={{ flex: 1 }}>{title}</AppText>
    </View>
  );
}

export function SettingCard({ title, children }: { title: string, children: any }) {
  return (
    <View>
      <AppText>{title}</AppText>
      <View style={styles.card}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: '100%',
    padding: 10,
    borderRadius: 20,
    gap: 10,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    width: '80%',
    borderRadius: 20,
    backgroundColor: colors.background
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 999,
  }
});