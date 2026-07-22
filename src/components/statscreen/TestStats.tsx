import Screen from '@/components/Screen';
import { AppText } from '../texts/AppText';
import { useStorage } from '@/hooks/useStorage';


export default function TestStats() {
  const { data } = useStorage();
  const level = data.jlptLevel;
  return (
    <Screen internal>
      <AppText>Simulado do {level}</AppText>
    </Screen>
  );
}
