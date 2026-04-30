import Card from '@/components/pressable/Card';
import FloatingButton from '@/components/pressable/FloatingButton';
import Screen from '@/components/Screen';
import { vh, vw } from '@/styles/globals';
import { textStyles } from '@/styles/texts';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const GAP = 16;

export default function HomeScreen() {

  

  const options = [
    "N5",
    "N4"
  ];

  return (
    <Screen>
      <FloatingButton options={options}/>

      <Image
      source={require('@/assets/images/logo.jpg')}
      style={styles.logo}
      contentFit="contain"
      />

      <View style={styles.table}>
        <Text style={[{marginBottom: 8}, textStyles.title]}>Teste Seus Conhecimentos</Text>
        <View style={styles.row}>
          <Card title='Simulado' style={{width: '100%'}} onPress={() => router.push("/practice-test")}/>
        </View>
      </View>
        

      <View style={styles.table}>
        <Text style={[{marginBottom: 8}, textStyles.title]}>Estude Por Competência</Text>
        
        <View style={styles.row}>
          <Card title='Vocabulário' style={[{backgroundColor: '#d22'}, styles.card]} onPress={() => router.push("/topic-study")}/>
          <Card title='Gramática' style={[{backgroundColor: '#a2a'}, styles.card]} onPress={() => router.push("/topic-study")}/>
        </View>

        <View style={styles.row}>
          <Card title='Leitura' style={[{backgroundColor: '#2b7'}, styles.card]} onPress={() => router.push("/topic-study")}/>
          <Card title='Audição' style={[{backgroundColor: '#cc3'}, styles.card]} onPress={() => router.push("/topic-study")}/>
        </View>
      </View>
    </Screen>
    
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50*vw,
    height: 30*vh,
  },
  row: { 
    flexDirection: 'row', 
    height: 20*vh, 
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
