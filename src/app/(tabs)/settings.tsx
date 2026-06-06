import { AppText } from '@/components/texts/AppText';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SwitchSetting, SliderSetting, ActionSetting, SettingCard } from '../../components/Settings';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggle = () => {
    setIsEnabled(previousState => !previousState);
  };
  const slide = (value: number) => {

  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppText>Configurações</AppText>

        <SettingCard title='Aparência'>
          <SwitchSetting icon={isEnabled ? 'moon' : 'sunny'} title='Modo' onChange={toggle} value={isEnabled} />

          <SwitchSetting icon='振' title='Furigana' onChange={toggle} value={isEnabled} />

          <SliderSetting
            title='Fonte'
            onChange={(value) => slide(value)}
            min={0}
            value={0}
            step={1}
            max={3}
            marker={'dot'}
            left={<AppText>Aa</AppText>}
            right={<AppText style={{ fontSize: 40 }}>Aa</AppText>}
          />
        </SettingCard>

        <SettingCard title='Som'>
          <SwitchSetting icon='ellipse' title='Feedback tátil' onChange={toggle} value={isEnabled} />

          <SliderSetting
            title='Volume Interno'
            value={0}
            onChange={() => { }}
            min={0}
            max={100}
          />
        </SettingCard>

        <SettingCard title='Suporte'>
          <ActionSetting icon='star' title='Avalie o app' />
          <ActionSetting icon='mail' title='Fale conosco' />
          <ActionSetting icon='open' title='Termos de uso' />
          <ActionSetting icon='bug' title='Relatar bugs' />
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