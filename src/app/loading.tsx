import { darkColors, lightColors } from '@/styles/globals';
import { Image } from 'expo-image';
import { Storage } from 'expo-sqlite/kv-store';
import { Appearance, StyleSheet, Text, View } from 'react-native';

// A tela de loading pode ser chamada antes do StorageProvider ser chamado
function getColorsBeforeContext() {
  try {
    const stored = Storage.getItemSync('theme');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed === 'dark') return darkColors;
      if (parsed === 'light') return lightColors;
    }
  } catch {}
  return Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;
}

export default function Loading() {
  const colors = getColorsBeforeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
	  <Image
        source={require('@/assets/images/logo.jpg')}
        style={styles.logo}
        contentFit="contain"
	  />
	  <Text style={[styles.message, { color: colors.textDark }]}>
        {'Carregando...'}
	  </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },
  logo: {
    width: 180,
    height: 180,
  },
  message: {
    textAlign: 'center',
  },
});
