import Header from '@/components/containers/headers';
import Screen from '@/components/Screen';
import { useStorage } from '@/hooks/useStorage';
import { useColors, useTheme } from '@/hooks/useTheme';
import { StyleSheet } from 'react-native';
import { ActionSetting, SettingCard, SliderSetting, SwitchSetting } from '../../components/Settings';

export default function SettingsScreen() {
  const { data, setValue } = useStorage();
  const colors = useColors();
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: colors.backgroundDim }]} withBottomTab>
      <Header title="Configurações"/>
      <SettingCard title='Aparência'>
        <SwitchSetting
          icon={isDarkMode ? 'moon' : 'sunny'}
          title='Modo'
          onChange={setIsDarkMode}
          value={isDarkMode}
        />

        <SwitchSetting
          icon='furigana'
          title='Furigana'
          furigana='振[ふ]'
          color={data.furigana ? colors.textDark : colors.textMuted}
          onChange={(value) => setValue('furigana', value)}
          value={data.furigana}
        />

        <SliderSetting
          title='Fonte'
          icon='textAa'
          onChange={(value) => setValue('fontSize', value)}
          value={data.fontSize}
          min={0}
          step={1}
          max={3}
          marker={'Dot'}
        />
      </SettingCard>

      <SettingCard title='Interação'>
        <SwitchSetting
          icon='vibrate'
          title='Feedback tátil'
          color={data.hapticFeedback ? colors.textDark : colors.textMuted}
          onChange={(value) => setValue('hapticFeedback', value)}
          value={data.hapticFeedback}
        />

        <SliderSetting
          title='Volume Interno'
          icon='volume-medium'
          value={data.volume}
          onChange={(value) => setValue('volume', value)}
          min={0}
          max={100}
        />
      </SettingCard>

      <SettingCard title='Suporte'>
        <ActionSetting icon='star' title='Avalie o app' url='https://play.google.com' />
        <ActionSetting icon='mail' title='Fale conosco' url='mailto:suporte@exemplo.com' />
        {/* <ActionSetting icon='open' title='Termos de uso' url='https://exemplo.com/termos' /> */}
        <ActionSetting icon='bug' title='Relatar bugs' url='https://github.com/JLPTrial/JLPTrial/blob/main/docs/ISSUES.MD' />
      </SettingCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40
  },
});