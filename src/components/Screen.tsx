import { colors } from '@/styles/globals';
import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({ children } : PropsWithChildren){

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={{ 
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24,
                gap: 20,
                
                }}>

                {children}

            </ScrollView>
        </SafeAreaView>
    )
}

