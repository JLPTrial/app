import Card from '@/components/pressable/Card';
import FloatingButton from '@/components/pressable/FloatingButton';
import Screen from '@/components/Screen';
import { textStyles } from '@/styles/texts';
import { Image } from 'expo-image';
import { RelativePathString, router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

function toPage(page : RelativePathString){
  router.push(page);
}

export default function HomeScreen() {

  return (
    <Screen>
      <FloatingButton/>

      <Image
      source={require('@/assets/images/logo.jpg')}
      style={styles.logo}
      contentFit="contain"
      />

      <View style={{alignSelf: 'stretch',  gap: 20}}>
        <Text style={textStyles.title}>Teste Seus Conhecimentos</Text>
        <Card title='Simulado' style={{width: '100%'}} onPress={() => toPage("/practice-test")}/>
      </View>

      <View style={{alignSelf: 'stretch', gap: 20}}>
        <Text style={textStyles.title}>Estude Por Competência</Text>
        
        <View style={{flexDirection: 'row', height: 150, alignSelf: 'stretch', gap: 20}}>
          <Card title='Vocabulário' style={{flex: 1, backgroundColor: '#d22'}} onPress={() => toPage("/topic-study")}/>
          <Card title='Gramática' style={{flex: 1, backgroundColor: '#a2a'}} onPress={() => toPage("/topic-study")}/>
        </View>

        <View style={{flexDirection: 'row', height: 150, alignSelf: 'stretch', gap: 20}}>
          <Card title='Leitura' style={{flex: 1, backgroundColor: '#2b7'}} onPress={() => toPage("/topic-study")}/>
          <Card title='Audição' style={{flex: 1, backgroundColor: '#cc3'}} onPress={() => toPage("/topic-study")}/>
        </View>
      </View>
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
  message: {
    textAlign: 'center',
  },
});
