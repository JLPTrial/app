import Screen from '@/components/Screen';
import { useColors } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
  const colors = useColors();

  return (
    <Screen style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      <ActivityIndicator size="large" color={colors.primary} />
    </Screen>
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
});
