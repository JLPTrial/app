import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.jpg')}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.message}>
        {'VOCÊ CONSEGUIU!\nTá tudo certo agora'}
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
