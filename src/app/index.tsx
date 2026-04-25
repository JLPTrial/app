import Card from '@/components/pressable/Card';
import Screen from '@/components/Screen';
import { textStyles } from '@/styles/texts';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <Screen>
      
      <Image
      source={require('@/assets/images/logo.jpg')}
      style={styles.logo}
      contentFit="contain"
      />
      

      <View style={{alignSelf: 'stretch',  gap: 20}}>
        <Text style={textStyles.title}>Teste Seus Conhecimentos</Text>
        <Card title='Simulados' style={{width: '100%'}}/>
      </View>

      <View style={{alignSelf: 'stretch', gap: 20}}>
        <Text style={textStyles.title}>Estude Por Competência</Text>
        
        <View style={{flexDirection: 'row', height: 150, alignSelf: 'stretch', gap: 20}}>
          <Card title='Kanji' style={{flex: 1, backgroundColor: '#d22'}}/>
          <Card title='Leitura' style={{flex: 1, backgroundColor: '#a2a'}}/>
        </View>

        <View style={{flexDirection: 'row', height: 150, alignSelf: 'stretch', gap: 20}}>
          <Card title='Áudio' style={{flex: 1, backgroundColor: '#2b7'}}/>
          <Card title='Áudio' style={{flex: 1, backgroundColor: '#cc3'}}/>
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
