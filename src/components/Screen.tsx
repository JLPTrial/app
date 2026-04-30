import { colors } from '@/styles/globals';
import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;

export default function Screen({ children, style } : ScreenProps){

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={[{ 
                flexGrow: 1,
                alignItems: 'center',
                paddingHorizontal: 24,
                gap: 20,
                
                }, style]}>

                {children}

            </ScrollView>
        </SafeAreaView>
    )
}

