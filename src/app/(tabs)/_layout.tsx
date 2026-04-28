import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/globals';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                // Garante que a barra não tenha overlap com a barra de navegação nativa do Android
                tabBarSafeInsetBottom: true,
                tabBarStyle: styles.tab,

                tabBarActiveTintColor: colors.primaryLight,
                tabBarInactiveTintColor: colors.textMuted,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="stats"
                options={{
                    title: 'Stats',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tab: {
        paddingBottom: 5,
        paddingTop: 5,
        height: 65,
    }
});
