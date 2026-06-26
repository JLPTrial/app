import { colors } from '@/styles/globals';
import { Icon } from './Icon';
import Slider from '@react-native-community/slider';
import { Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './texts/AppText';
import { Marker, MarkerType } from './slider/Marker';
import React, { useCallback } from 'react';
import { AppSwitch } from './pressable/AppSwitch';

type SliderProps = {
  title: string,
  icon: string,
  value: number,
  onChange: (value: number) => void,
  min: number,
  step?: number,
  max: number,
  left?: React.ReactNode,
  right?: React.ReactNode,
  marker?: MarkerType,
};

type SwitchProps = {
  icon: string,
  title: string,
  value: boolean,
  color?: string,
  furigana?: string,
  onChange: (value: boolean) => void,
}

type ActionProps = {
  icon: string,
  title: string,
  url: string,
}

type CardProps = {
  title: string,
  children: React.ReactNode,
}

export function SwitchSetting({ icon, furigana, title, color = colors.textDark, value, onChange }: SwitchProps) {

  return (
    <View style={styles.horizontal}>
      <Icon
        name={icon}
        furigana={furigana}
        size={32}
        color={color}
      />

      <AppText style={styles.switchTitle}>{title}</AppText>

      <AppSwitch
        value={value}
        onChange={(value : boolean) => onChange(value)}
      />
    </View>
  );
}

export function SliderSetting({ title, icon, value, onChange, min, max, step = 0,
  left, right, marker = 'none' }: SliderProps) {

  return (
    <View>
      <View style={styles.horizontal}>
        <Icon
          name={icon}
          size={32}
          color={colors.textDark}
        />

        <AppText style={styles.switchTitle}>{title}</AppText>
      </View>
      
      <View>
        {left}
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onSlidingComplete={onChange}
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
    <Pressable onPress={handlePress} >
      <View style={styles.horizontal}>
        <Icon
          name={icon}
          size={32}
          color={colors.textDark}
        />

        <AppText style={styles.switchTitle}>{title}</AppText>
      </View>
    </Pressable>
  );
}

export function SettingCard({ title, children }: CardProps) {
  const setting = React.Children.toArray(children);
  return (
    <View style={styles.container}>
      <AppText bold style={{marginBottom:5}}>{title}</AppText>

      <View style={styles.card}>
        {setting.map((child, index) =>
          (
            <View key={index} style={[(index < setting.length - 1) && styles.line]}>
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
    flex:1,
    width: '100%',
  },
  horizontal:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  card: {
    padding: 20,
    borderRadius: 30,
    gap: 20,
    backgroundColor: colors.background,
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
    borderColor: colors.border,
  }
});