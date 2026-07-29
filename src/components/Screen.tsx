import { useColors } from '@/hooks/useTheme';
import React, { PropsWithChildren } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenProps = PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
    withBottomTab?: boolean;
    internal?: boolean;
}>;

export default function Screen({ children, style, withBottomTab = false, internal = false } : ScreenProps){
  const colors = useColors();

  return (
    <SafeAreaView
      edges={
        withBottomTab
          ? ['left', 'right', 'top']
          :
          internal
            ? ['left', 'right']
            : ['left', 'right', 'top', 'bottom']
      }
      style={{flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={[{
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 20,
        gap: 20,

      }, style]}>

        {children}

      </ScrollView>
    </SafeAreaView>
  );
}

