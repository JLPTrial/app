import { StyleSheet } from 'react-native';
import { ColorScheme, vw } from './globals';

export const textStyles = StyleSheet.create({
  base: {
    fontSize: 5 * vw,
    fontFamily: 'sans-serif',
  },

  /*** SUBSTYLES ***/
  title: {
    // Estilo dos títulos das questões e da aba de resultados e estatísticas
    fontSize: 5.5 * vw,
    fontWeight: 'bold',
  },
  subtitle: {
    // Estilo dos subtítulos da aba de resultados e estatísticas
    fontSize: 5.25 * vw,
    fontWeight: 'bold',
  },
  statSubtitle: {
    // Estilo usado nos subtítulos da aba de estatística
    fontWeight: 'bold',
  },
  tag: {
    // Estilo das tags, dos headers das questões, do botão de explicação (aba de estatísticas) e da lista do curso
  },
  question: {
    // Estilo da primeira parte das questões (a parte em negrito)
    fontWeight: 'bold',
  },
  reading: {
    // Estilo específico para os blocos de texto maiores
  },
  graphText: {
    // Estilo usado no gráfico das estatísticas
    fontWeight: 'bold',
  },
  success: {
    // Estilo utilizado para mostrar a quantidade de questões corretas
    fontSize: 6.5 * vw,
    fontWeight: 'bold',
  },
  answer: {},
  bold: {
    fontWeight: 'bold',
  },
  underlining: {
    textDecorationLine: 'underline',
  },
  center: {
    textAlign: 'center',
  },
});

const variantColorMap = (colors: ColorScheme): Partial<Record<string, string>> => ({
  statSubtitle: colors.evaluation,
  tag: colors.textLight,
  graphText: colors.graphText,
  success: colors.success,
});

export function getVariantColor(colors: ColorScheme, variant: string): string {
  return variantColorMap(colors)[variant] ?? colors.textDark;
}