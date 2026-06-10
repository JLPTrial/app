import { AppText } from '@/components/texts/AppText';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';
import { useStorage } from '@/hooks/useStorage';
import { colors } from '@/styles/globals';

export default function SettingsScreen() {
  const {data, setValue} = useStorage();

  const [isDarkMode, setDarkMode] = useState(data.darkMode);
  const [isFuriganaOn, setFurigana] = useState(data.furigana);

  const [isHapticFeedbackOn, setHapticFeedback] = useState(data.hapticFeedback);

  const [fontSize, setFontSize] = useState(data.fontSize);
  const [volume, setVolume] = useState(data.volume);

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppText bold style={styles.header}>Configurações</AppText>

        <SettingCard title='Aparência'>
          <SwitchSetting 
            icon={isDarkMode ? 'moon' : 'sunny'} 
            title='Modo' 
            onChange={(value) => {setDarkMode(value); setValue('darkMode', value); }} 
            value={isDarkMode} />

          <SwitchSetting 
            icon='furigana'
            title='Furigana' 
            furigana={isFuriganaOn ? '振[入]': '振[切]'}
            color={isFuriganaOn ? colors.textDark : colors.textMuted}
            onChange={(value) => {setFurigana(value); setValue('furigana', value); }}
            value={isFuriganaOn} />

          <SliderSetting
            title='Fonte'
            onChange={(value) => {setFontSize(value); setValue('fontSize', value);}}
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
            icon='ellipse' 
            title='Feedback tátil' 
            onChange={(value) => {setHapticFeedback(value); setValue('hapticFeedback', value); }}
            value={isHapticFeedbackOn} />

          <SliderSetting
            title='Volume Interno'
            value={volume}
            onChange={(value) => {setVolume(value); setValue('volume', value);}}
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
  header:{
    backgroundColor:colors.primary,
    color: colors.background,
    padding:10,
    borderRadius:999,
    margin:10,
  },
});