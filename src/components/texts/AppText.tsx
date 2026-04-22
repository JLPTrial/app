import React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { textStyles } from '../../styles/texts';

type TextVariant = Exclude<keyof typeof textStyles, 'bold' | 'center' | 'underlining' | 'answer'>;

// Interface estendendo TextProps para aceitar as propriedades padrão do <Text>
interface AppTextProps extends TextProps {
  variant?: TextVariant;
  answer?: boolean;
  bold?: boolean;
  underlining?: boolean;
  center?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'base',
  answer,
  bold,
  underlining,
  center,
  style,
  children,
  ...rest
}) => {
  const combinedStyles = [
    textStyles['base'], // Combinando o estilo base com os subestilos
    textStyles[variant],
    answer && textStyles.answer,
    bold && textStyles.bold,
    underlining && textStyles.underlining,
    center && textStyles.center,
    style,
  ];

  return (
    <Text style={combinedStyles} {...rest}>
      {children}
    </Text>
  );
};