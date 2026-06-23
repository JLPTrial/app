import { AppText } from '@/components/texts/AppText';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Screen from '@/components/Screen';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';
import { useStorage } from '@/hooks/useStorage';
import { colors } from '@/styles/globals';
import Header from '@/components/containers/headers';

export default function SettingsScreen() {
  const { data, setValue } = useStorage();

  const [isDarkMode, setDarkMode] = useState(data.darkMode);
  const [isFuriganaOn, setFurigana] = useState(data.furigana);

  const [isHapticFeedbackOn, setHapticFeedback] = useState(data.hapticFeedback);

  const [fontSize, setFontSize] = useState(data.fontSize);
  const [volume, setVolume] = useState(data.volume);

  return (
    <Screen style={styles.container} withBottomTab>
      <Header title="Configurações"/>

      <SettingCard title='Aparência'>
        <SwitchSetting
          icon={isDarkMode ? 'moon' : 'sunny'}
          title='Modo'
          onChange={(value) => { setDarkMode(value); setValue('darkMode', value); }}
          value={isDarkMode} />

        <SwitchSetting
          icon='furigana'
          title='Furigana'
          furigana='振[ふ]'
          color={isFuriganaOn ? colors.textDark : colors.textMuted}
          onChange={(value) => { setFurigana(value); setValue('furigana', value); }}
          value={isFuriganaOn} />

        <SliderSetting
          title='Fonte'
          onChange={(value) => { setFontSize(value); setValue('fontSize', value); }}
          value={fontSize}
          min={0}
          step={1}
          max={3}
          marker={'dot'}
          left={<AppText>Aa</AppText>}
          right={<AppText style={{ fontSize: 40 }}>Aa</AppText>}
        />
      </SettingCard>

      <SettingCard title='Interação'>
        <SwitchSetting
          icon='vibrate'
          title='Feedback tátil'
          color={isHapticFeedbackOn ? colors.textDark : colors.textMuted}
          onChange={(value) => { setHapticFeedback(value); setValue('hapticFeedback', value); }}
          value={isHapticFeedbackOn} />

        <SliderSetting
          title='Volume Interno'
          value={volume}
          onChange={(value) => { setVolume(value); setValue('volume', value); }}
          min={0}
          max={100}
        />
      </SettingCard>

      <SettingCard title='Suporte'>
        <ActionSetting icon='star' title='Avalie o app' url='' />
        <ActionSetting icon='mail' title='Fale conosco' url='' />
        <ActionSetting icon='open' title='Termos de uso' url='' />
        <ActionSetting icon='bug' title='Relatar bugs' url='https://github.com/JLPTrial/JLPTrial/blob/main/docs/ISSUES.MD' />
      </SettingCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDim,
  },
});