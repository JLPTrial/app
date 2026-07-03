export type JLPTLevel = 'N5' | 'N4';

export interface Question {
	id: number;
	text: string;
	command: string;
	type: 'kanji' | 'vocabulary' | 'reading' | 'grammar' | 'listening';
	image: string | null;
	audio: string | null;
	contextualText: string | null;
	tags: string[];
	alternatives: string[];
	correctAlternative: number;
	date: Date | null;
	isCorrect: boolean | null,
}

export interface SessionResult {
  right: {
    total: number,
    kanji: number,
    vocabulary: number,
    grammar: number,
    reading: number,
	listening: number
  };
  total: {
    total: number,
    kanji: number,
    vocabulary: number,
    grammar: number,
    reading: number,
	listening: number
  };
};