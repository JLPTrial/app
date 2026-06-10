import { colors } from '@/styles/globals';
import { Icon } from './Icon';
import Slider from '@react-native-community/slider';
import { Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './texts/AppText';
import { Switch } from 'react-native-switch';
import { Marker, MarkerType } from './slider/Marker';
import React, { useCallback } from 'react';

type SliderProps = {
  title: string,
  value: number,
  onChange: (value: number) => void,
  min: number,
  step?: number,
  max: number,
  left?: React.ReactNode,
  right?: React.ReactNode,
  marker?: MarkerType
};

type SwitchProps = {
  icon: string,
  title: string,
  value: boolean,
  color?: string,
  furigana?: string,
  onChange: (value: boolean) => void
}

type ActionProps = {
  icon: string,
  title: string,
  url: string,
}

export function SwitchSetting({ icon, furigana, title, color = colors.textDark, value, onChange }: SwitchProps) {

  return (
    <View style={[styles.container, styles.horizontal]}>
      <Icon
        name={icon}
        furigana={furigana}
        size={32}
        color={color}
      />

      <AppText style={styles.switchTitle}>{title}</AppText>

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
    </View>
  );
}

export function SliderSetting({ title, value, onChange, min, max, step = 0,
  left, right, marker = 'none' }: SliderProps) {

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
          StepMarker={Marker[marker]}
          thumbTintColor={(marker === 'none') ? colors.primary : 'transparent'}
          style={styles.slider}
        />
        {right}
      </View>
    </View>
  );
}

export function ActionSetting({ icon, title, url }: ActionProps) {
  const handlePress = useCallback(async () => {
    try {
      const isSupported = await Linking.canOpenURL(url);

      if (isSupported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Não foi possível te redirecionar.');
      }
    }
    catch {
      Alert.alert('Ocorreu um erro ao te redirecionar.');
    }
  }, [url]);

  return (
    <Pressable
      style={[styles.container, styles.horizontal]}
      onPress={handlePress}
    >
      <Icon
        name={icon}
        size={32}
        color={colors.textDark}
      />
      <AppText style={{ flex: 1 }} center>{title}</AppText>
    </Pressable>
  );
}

export function SettingCard({ title, children }: { title: string, children: any }) {

  const setting = React.Children.toArray(children);
  return (
    <View>
      <AppText bold>{title}</AppText>

      <View style={styles.card}>
        {setting.map((child, index) =>
          (
            <View key={index} style={(index < setting.length - 1) && styles.line}>
              {child}
            </View>
          ))
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    padding: 20,
    borderRadius: 30,
    gap: 20,
    marginTop: 5,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  slider: {
    paddingVertical: 20,
    flex: 1,
    justifyContent: 'center',
  },
  switchTitle: {
    flex: 1,
    marginLeft: 10,
  },
  line: {
    justifyContent: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
  }
});