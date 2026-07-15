import { StyleSheet } from 'react-native';
import Screen from '@/components/Screen';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';
import { useStorage } from '@/hooks/useStorage';
import { colors } from '@/styles/globals';
import Header from '@/components/containers/headers';

export default function SettingsScreen() {
  const { data, setValue } = useStorage();

  return (
    <Screen style={styles.container} withBottomTab>
      <Header title="Configurações"/>

      <SettingCard title='Aparência'>
        <SwitchSetting
          icon={data.darkMode ? 'moon' : 'sunny'}
          title='Modo'
          onChange={(value) => setValue('darkMode', value) }
          value={data.darkMode} />

        <SwitchSetting
          icon='furigana'
          title='Furigana'
          furigana='振[ふ]'
          color={data.furigana ? colors.textDark : colors.textMuted}
          onChange={(value) => setValue('furigana', value) }
          value={data.furigana} />

        <SliderSetting
          title='Fonte'
          icon='textAa'
          onChange={(value) => setValue('fontSize', value) }
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
          onChange={(value) => setValue('hapticFeedback', value) }
          value={data.hapticFeedback} />

        <SliderSetting
          title='Volume Interno'
          icon='volume-medium'
          value={data.volume}
          onChange={(value) => setValue('volume', value) }
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
    gap:40,
  },
});