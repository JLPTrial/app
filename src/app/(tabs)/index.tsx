import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import AudioPlayer from '../../components/AudioPlayer.tsx';
import { assetsMap } from '../../constants/assetsMap.ts';
import { useStorage } from '@/hooks/useStorage';

export default function HomeScreen() {
  const {data, setValue} = useStorage();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.jpg')}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.message}>
        {'VOCÊ CONSEGUIU!\n O nível é '} { data.jlptLevel }
      </Text>
      <AudioPlayer source={assetsMap["N5listening/JT4Y/L6-Q5.mp3"]}/>
      <Link href="/demo/questions">
      Ir para uma questão
      </Link>
       <Link href="/demo/manyQuestions">
      Ir para várias questões
      </Link>
      <Button title='N5' onPress={() => setValue('jlptLevel', 'N5')}/>
      <Button title='N4' onPress={() => setValue('jlptLevel', 'N4')}/>
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
