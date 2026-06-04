import { AppText } from '@/components/texts/AppText';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';
import { colors } from '@/styles/globals';


export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggle = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <AppText>Configurações</AppText>

      <SettingCard title='Aparência'>
        <SwitchSetting icon={isEnabled ? 'moon' : 'sunny'} title='Modo' onChange={toggle} value={isEnabled} />
        <SwitchSetting icon='ellipse' title='Furigana' onChange={toggle} value={isEnabled} />

        <SliderSetting title='Fonte' min={0} onChange={() => { }} value={0} step={1} max={3}
          left={<AppText>Aa</AppText>}
          right={<AppText style={{ fontSize: 40 }}>Aa</AppText>}
        />

      </SettingCard>


      <SettingCard title='Som'>
        <SwitchSetting icon='ellipse' title='Vibração' onChange={toggle} value={isEnabled} />

        <SliderSetting title='Volume' min={0} onChange={() => { }} value={0} step={10} max={100}
          left={<AppText style={{ fontSize: 40 }}>-</AppText>}
          right={<AppText style={{ fontSize: 40 }}>+</AppText>}
        />

      </SettingCard>



      <SettingCard title='Suporte'>
        <ActionSetting icon='star' title='Avalie o app' />
        <ActionSetting icon='mail' title='Fale conosco' />
        <ActionSetting icon='open' title='Termos de uso' />
      </SettingCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', alignItems: 'center' },
  bla: {
    width: 200,
    borderColor: colors.textMuted
  },
});