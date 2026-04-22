import { StyleSheet } from 'react-native';
import { colors, vw } from './globals';

export const textStyles = StyleSheet.create({
  base: {
    color: colors.textDark,
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
    color: colors.evaluation,
  },
  tag: {
    // Estilo das tags, dos headers das questões, do botão de explicação (aba de estatísticas) e da lista do curso
    color: colors.textLight,
  },
  question: {
    // Estilo da primeira parte das questões (a parte em negrito)
    fontWeight: 'bold',
  },
  reading: {
    // Estilo específico para os blocos de texto maiores 
    color: colors.textDark,
  },
  graphText: {
    // Estilo usado no gráfico das estatísticas
    color: colors.graphText,
    fontWeight: 'bold',
  },
  success: {
    // Estilo utilizado para mostrar a quantidade de questões corretas
    fontSize: 6.5 * vw,
    fontWeight: 'bold',
    color: colors.success,
  },
  answer: {
    color: colors.primaryLight,
  },
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