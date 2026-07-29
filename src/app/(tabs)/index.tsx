import Card from '@/components/pressable/Card';
import FloatingButton from '@/components/pressable/FloatingButton';
import Screen from '@/components/Screen';
import { AppText } from '@/components/texts/AppText';
import { useStorage } from '@/hooks/useStorage';
import { useColors } from '@/hooks/useTheme';
import { vh, vw } from '@/styles/globals';
import { JLPTLevel } from '@/types/types';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const GAP = 16;

const levels = [
  "N5",
  "N4"
];

export default function HomeScreen() {
  const { data, setValue } = useStorage();
  const colors = useColors();

  return (
    <Screen withBottomTab>
      <FloatingButton options={levels} defaultValue={data.jlptLevel} onPress={(item: JLPTLevel) => {
        setValue('jlptLevel', item);
      }} />

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        contentFit="contain"
      />

      <View style={styles.table}>
        <AppText variant="title" style={{ marginBottom: 8 }}>Teste Seus Conhecimentos</AppText>
        <View style={styles.row}>
          <Card title='Simulado' style={{ width: '100%' }} onPress={() => router.push({pathname: "/exam-lobby", params: { label: "Simulado"}})} />
        </View>
      </View>

      <View style={styles.table}>
        <AppText variant="title" style={{ marginBottom: 8 }}>Estude Por Competência</AppText>

        <View style={styles.row}>
          <Card title='Vocabulário' style={[{ backgroundColor: colors.vocabulary }, styles.card]} onPress={() => router.push({pathname: "/session-lobby", params: { type: "vocabulary", label: "Vocabulário"}})} />
          <Card title='Gramática' style={[{ backgroundColor: colors.grammar }, styles.card]} onPress={() => router.push({pathname: "/session-lobby", params: { type: "grammar", label: "Gramática"}})} />
        </View>

        <View style={styles.row}>
          <Card title='Leitura' style={[{ backgroundColor: colors.reading }, styles.card]} onPress={() => router.push({pathname: "/session-lobby", params: { type: "reading", label: "Leitura"}})} />
          <Card title='Audição' style={[{ backgroundColor: colors.listening }, styles.card]} onPress={() => router.push({pathname: "/session-lobby", params: { type: "listening", label: "Audição"}})} />
        </View>

        <View style={styles.row}>
          <Card title='Kanji' style={[{ backgroundColor: colors.kanji }, styles.card]} onPress={() => router.push({pathname: "/session-lobby", params: { type: "kanji", label: "Kanji"}})} />
        </View>
      </View>
    </Screen>

  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50 * vw,
    height: 30 * vh,
  },
  row: {
    flexDirection: 'row',
    height: 20 * vh,
    alignSelf: 'stretch',
    gap: GAP,
  },
  table: {
    alignSelf: 'stretch',
    gap: GAP,
  },
  card: {
    flex: 1
  }
});
