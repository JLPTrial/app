import { AppText } from '@/components/texts/AppText';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';

export default function SettingsScreen() {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isFuriganaOn, setFurigana] = useState(false);

  const [isHapticFeedbackOn, setHapticFeedback] = useState(false);

  const [fontSize, setFontSize] = useState(0);
  const [volume, setVolume] = useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppText>Configurações</AppText>

        <SettingCard title='Aparência'>
          <SwitchSetting icon={isDarkMode ? 'moon' : 'sunny'} title='Modo' onChange={setDarkMode} value={isDarkMode} />

          <SwitchSetting icon='振' title='Furigana' onChange={setFurigana} value={isFuriganaOn} />

          <SliderSetting
            title='Fonte'
            onChange={(value) => setFontSize(value)}
            value={fontSize}
            min={0}
            step={1}
            max={3}
            marker={'dot'}
            left={<AppText>Aa</AppText>}
            right={<AppText style={{ fontSize: 40 }}>Aa</AppText>}
          />
        </SettingCard>

        <SettingCard title='Som'>
          <SwitchSetting icon='ellipse' title='Feedback tátil' onChange={setHapticFeedback} value={isHapticFeedbackOn} />

          <SliderSetting
            title='Volume Interno'
            value={volume}
            onChange={(value) => setVolume(value)}
            min={0}
            max={100}
          />
        </SettingCard>

        <SettingCard title='Suporte'>
          <ActionSetting icon='star' title='Avalie o app' url='' />
          <ActionSetting icon='mail' title='Fale conosco' url='' />
          <ActionSetting icon='open' title='Termos de uso' url='' />
          <ActionSetting icon='bug' title='Relatar bugs' url='' />
        </SettingCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});