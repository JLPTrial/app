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

  it('separar furigana do resto', () => {
    const parsed = statementParser('私[わたし]は');
    expect(parsed).toEqual(['私[わたし]', 'は']);
  });

  it('reconhecer pontuações japonesas', () => {
    const parsed = statementParser('「おはよう」');
    expect(parsed).toEqual(['「', 'おはよう', '」']);
  });

  it('retornar array vazio se a string for nula ou vazia', () => {
    expect(statementParser('')).toEqual([]);
    expect(statementParser(undefined as any)).toEqual([]);
  });
});