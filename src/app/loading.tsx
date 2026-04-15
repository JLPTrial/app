import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  return (
	<View style={styles.container}>
	  <Image
		source={require('@/assets/images/logo.jpg')}
		style={styles.logo}
		contentFit="contain"
	  />
	  <Text style={styles.message}>
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
