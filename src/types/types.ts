export type JLPTLevel = 'N5' | 'N4';

export interface Question {
	id: number;
	text: string;
	command: string;
	type: string;
	image: string | null;
	audio: string | null;
	contextualText: string | null;
	tags: string[];
	alternatives: string[];
	correctAlternative: number;
	date: Date | null;
	isCorrect: boolean | null,
}