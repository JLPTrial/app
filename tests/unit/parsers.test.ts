import { statementParser,  secondsToTimer } from '@/utils/parsers';

describe('secondsToTimer', () => {
  it('formatar segundos abaixo de um minuto', () => {
    expect(secondsToTimer(45)).toBe('00:00:45');
  });

  it('formatar minutos e segundos', () => {
    expect(secondsToTimer(125)).toBe('00:02:05');
  });

  it('formatar horas, minutos e segundos', () => {
    expect(secondsToTimer(3665)).toBe('01:01:05');
  });

  it('tratar valores negativos aplicando o módulo', () => {
    expect(secondsToTimer(-65)).toBe('00:01:05');
  });
});

describe('statementParser', () => {
  it('extrair espaços em branco [blank]', () => {
    const parsed = statementParser('A [blank] B');
    expect(parsed).toEqual(['A', ' ', '[blank]', ' ', 'B']);
  });

  it('reconhecer [underline_blank] e [star_underline_blank]', () => {
    const parsed = statementParser('[underline_blank] [star_underline_blank]');
    expect(parsed).toEqual(['[underline_blank]', ' ', '[star_underline_blank]']);
  });

  it('extrair conteúdo entre chaves {palavra} como token único', () => {
    const parsed = statementParser('これは{重要}です');
    expect(parsed).toEqual(['これは', '{重要}', 'です']);
  });

  it('separar furigana em kanji do resto', () => {
    const parsed = statementParser('私[わたし]は');
    expect(parsed).toEqual(['私[わたし]', 'は']);
  });

  it('agrupar sequências contínuas de Hiragana e Katakana', () => {
    const parsed = statementParser('ひらがな カタカナ');
    expect(parsed).toEqual(['ひらがな', ' ', 'カタカナ']);
  });

  it('reconhecer pontuações japonesas', () => {
    const parsed = statementParser('「おはよう」');
    expect(parsed).toEqual(['「', 'おはよう', '」']);
  });

  it('separar pontuações complexas e parênteses', () => {
    const parsed = statementParser('（これ）！？：；『それ』');
    expect(parsed).toEqual(['（', 'これ', '）', '！', '？', '：', '；', '『', 'それ', '』']);
  });

  it('agrupar múltiplos espaços em branco', () => {
    const parsed = statementParser('A   B');
    expect(parsed).toEqual(['A', '   ', 'B']);
  });

  it('retornar array vazio se a string for nula', () => {
    expect(statementParser('')).toEqual([]);
    expect(statementParser(null as any)).toEqual([]);
    expect(statementParser(undefined as any)).toEqual([]);
  });

  it('capturar caracteres individuais como fallback via "."', () => {
    const parsed = statementParser('N5: 100%');
    expect(parsed).toEqual(['N', '5', ':', ' ', '1', '0', '0', '%']);
  });
});