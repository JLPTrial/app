import Screen from '@/components/Screen';
import { useDisplayColors } from '@/components/ThemeTransition';
import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
  const colors = useDisplayColors();

  return (
    <Screen style={styles.container}>
      <Image
        source={require('@/assets/images/logo.jpg')}
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
