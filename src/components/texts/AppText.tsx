import { useColors } from '@/hooks/useTheme';
import { fontSizeScaleMap } from '@/constants/fontSize';
import { useStorage } from '@/hooks/useStorage';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { getVariantColor, textStyles } from '../../styles/texts';

export type TextVariant = Exclude<keyof typeof textStyles, 'bold' | 'center' | 'underlining'>;

// Interface estendendo TextProps para aceitar as propriedades padrão do <Text>
export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  bold?: boolean;
  underlining?: boolean;
  center?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'base',
  bold,
  underlining,
  center,
  style,
  children,
  ...rest
}) => {
  const colors = useColors();

  const variantColor = getVariantColor(colors, variant);
  const { data } = useStorage();

  const combinedStyles = [
    textStyles['base'], // Combinando o estilo base com os subestilos
    textStyles[variant],
    { color: variantColor },
    bold && textStyles.bold,
    underlining && textStyles.underlining,
    center && textStyles.center,
    style,
  ];

  const flattenedStyle = StyleSheet.flatten(combinedStyles) as TextStyle;
  const baseFontSize = flattenedStyle?.fontSize ?? textStyles['base'].fontSize;
  const scale = fontSizeScaleMap[data.fontSize] ?? 1;

  return (
    <Text style={[combinedStyles, { fontSize: baseFontSize * scale }]} {...rest}>
      {children}
    </Text>
  );
};