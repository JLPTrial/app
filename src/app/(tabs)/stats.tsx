import { StyleSheet } from 'react-native';
import Screen from '@/components/Screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopicStats from '@/components/statscreen/TopicStats';
import TestStats from '@/components/statscreen/TestStats';
import Header from '@/components/containers/headers';
import { useColors } from '@/hooks/useTheme';

const Tab = createMaterialTopTabNavigator();

export default function StatsScreen() {
  const colors = useColors();

  return (
    <Screen withBottomTab style={styles.reset}>
      <Header title="Estatísticas"/>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.textDark,
          tabBarInactiveTintColor:  colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.backgroundDim,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
          }
        }}
        style={styles.tabScreen}>
        <Tab.Screen name="Tópicos" component={TopicStats} />
        <Tab.Screen name="Simulado" component={TestStats} />
      </Tab.Navigator>
    </Screen>
  );
}

const styles = StyleSheet.create({
  reset: {
    paddingHorizontal: 0,
  },
  tabScreen: {
    alignSelf: 'stretch'
  }
});