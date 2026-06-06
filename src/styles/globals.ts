import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const vw = width / 100;
export const vh = height / 100;

export const colors = {
  primary: '#CC0033',        // Fundo dos cabeçalhos das questões e das tags
  primaryLight: '#F68178',   // Texto da alternativa correta, tab ativa
  background: '#FAFAFA',     // Fundo padrão
  backgroundSecondary: '#dfdfdf',     // Fundo padrão
  surface: '#F1F4F6',        // Círculo das alternativas inativas
  selected: '#FFE6E6',       // Círculo externo da alternativa ativa
  selectedDark: '#EA909C',   // Círculo interno da alternativa ativa
  highlight: '#FFEEFF',      // Fundo dos blocos de texto de leitura
  highlightDark: '#FFCCCC',  // Fundo do bloco alvo dentro do texto de leitura
  textDark: '#212121',       // Textos principais (quase preto para boa legibilidade)
  textMuted: '#757575',      // Textos secundários, tab inativa
  textLight: '#FAFAFA',      // Textos dos headers das questões e das tags
  border: '#D7D7D7',         // Bordas das alternativas
  audioPlayer: '#ddd',       // Fundo do player de áudio
  success: '#0AB263',        // Texto da quantidade de questões corretas
  error: '#DC2626',          // Questões e alternativas incorretas
  successBlock: '#F5F5DC',   // Fundo dos blocos da tela de resultado
  mid: '#F5A623',            // Cor do texto quando o desempenho é mediano
  failure: '#d60237',        // Cor do texto de fracasso
  graphInner: '#CBD4ED',     // Interior do gráfico de estatísticas
  graphBorder: '#0261D2',    // Bordas do gráfico de estatísticas
  graphText: '#0b3894',      // Texto em volta do gráfico de estatísticas
  evaluation: '#0261D2',     // Títulos e subtítulos de evaluation/advice da aba de estatística, lista do curso   
  explanation: '#E967B3',    // Botão de explicação
  readingMenuBox: '#B147AB', // Caixa de leitura e de compreensão do menu
  grammar: '#a2a',           // Cor de destaque das questões de gramática
  vocabulary: '#d22',        // Cor de destaque das questões de vocabulário
  reading: '#2b7',           // Cor de destaque das questões de leitura
  kanji: '#cc3',             // Cor de destaque das questões de kanji
  listening: '#3ac',         // Cor de destaque das questões de audição
};
