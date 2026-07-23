import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const vw = width / 100;
export const vh = height / 100;

export const lightColors = {
  primary: '#CC0033',             // Fundo dos cabeçalhos das questões e das tags
  primaryLight: '#F68178',        // Texto da alternativa correta, tab ativa
  background: '#FAFAFA',          // Fundo padrão
  backgroundDim: '#EDEDED',       // Fundo secundário de menor contraste
  surface: '#F1F4F6',             // Círculo das alternativas inativas
  textDark: '#212121',            // Textos principais (quase preto para boa legibilidade)
  textMuted: '#757575',           // Textos secundários, tab inativa
  textLight: '#FAFAFA',           // Textos dos headers das questões e das tags
  border: '#D7D7D7',              // Bordas das alternativas
  audioPlayer: '#DDDDDD',         // Fundo do player de áudio
  success: '#0AB263',             // Texto da quantidade de questões corretas
  error: '#DC2626',               // Questões e alternativas incorretas
  successBlock: '#F5F5DC',        // Fundo dos blocos da tela de resultado
  mid: '#F5A623',                 // Cor do texto quando o desempenho é mediano
  failure: '#D60237',             // Cor do texto de fracasso
  graphInner: '#CBD4ED',          // Interior do gráfico de estatísticas
  graphBorder: '#0261D2',         // Bordas do gráfico de estatísticas
  graphText: '#0B3894',           // Texto em volta do gráfico de estatísticas
  evaluation: '#0261D2',          // Títulos e subtítulos de evaluation/advice da aba de estatística, lista do curso
  explanation: '#E967B3',         // Botão de explicação
  grammar: '#AA22AA',             // Cor de destaque das questões de gramática
  vocabulary: '#DD2222',          // Cor de destaque das questões de vocabulário
  reading: '#22BB77',             // Cor de destaque das questões de leitura
  kanji: '#F39C12',               // Cor de destaque das questões de kanji
  listening: '#33AACC',           // Cor de destaque das questões de audição
  card: '#33AAFF',                // Cor de fundo dos cards
  alternativePressed: '#9DD6D6',  // Alternativa pressionada na tela de questões
  alternativeChosen: '#181c29',   // Alternativa escolhida na tela de questões
  alternativeDisabled: '#CCCCCC', // Alternativa desabilitada na tela de questões
  floatingMenu: '#FFFFFF',        // Cor de fundo do menu flutuante
  floatingOption: '#EEEEEE',      // Cor de fundo das opções do menu flutuante
};

export const darkColors = {
  primary: '#CC0033',             // Fundo dos cabeçalhos das questões e das tags
  primaryLight: '#F68178',        // Texto da alternativa correta, tab ativa
  background: '#121212',          // Fundo padrão
  backgroundDim: '#1E1E1E',       // Fundo secundário de menor contraste
  surface: '#1E1E1E',             // Círculo das alternativas inativas
  textDark: '#E1E1E1',            // Textos principais
  textMuted: '#9E9E9E',           // Textos secundários, tab inativa
  textLight: '#FAFAFA',           // Textos dos headers das questões e das tags
  border: '#3A3A3C',              // Bordas das alternativas
  audioPlayer: '#2C2C2E',         // Fundo do player de áudio
  success: '#0AB263',             // Texto da quantidade de questões corretas
  error: '#DC2626',               // Questões e alternativas incorretas
  successBlock: '#1A1F14',        // Fundo dos blocos da tela de resultado
  mid: '#F5A623',                 // Cor do texto quando o desempenho é mediano
  failure: '#D60237',             // Cor do texto de fracasso
  graphInner: '#1E2D47',          // Interior do gráfico de estatísticas
  graphBorder: '#0261D2',         // Bordas do gráfico de estatísticas
  graphText: '#6699CC',           // Texto em volta do gráfico de estatísticas
  evaluation: '#6699CC',          // Títulos e subtítulos de evaluation/advice da aba de estatística, lista do curso
  explanation: '#E967B3',         // Botão de explicação
  grammar: '#BB44BB',             // Cor de destaque das questões de gramática
  vocabulary: '#EE4444',          // Cor de destaque das questões de vocabulário
  reading: '#44CC88',             // Cor de destaque das questões de leitura
  kanji: '#F39C12',               // Cor de destaque das questões de kanji
  listening: '#44AACC',           // Cor de destaque das questões de audição
  card: '#2288DD',                // Cor de fundo dos cards
  alternativePressed: '#1A3030',  // Alternativa pressionada na tela de questões
  alternativeChosen: '#4A7FD4',   // Alternativa escolhida na tela de questões
  alternativeDisabled: '#3A3A3C', // Alternativa desabilitada na tela de questões
  floatingMenu: '#2C2C2E',        // Cor de fundo do menu flutuante
  floatingOption: '#3A3A3C',      // Cor de fundo das opções do menu flutuante
};

export type ColorScheme = typeof lightColors;