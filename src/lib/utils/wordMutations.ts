type WordForms = [string, string, string];

const WORD_FORMS: Record<string, WordForms> = {
	item: ["товар", "товара", "товаров"],
};

export function mutateWord(count: number, word: string): string {
	const forms = WORD_FORMS[word] ?? [word, word, word];
	const value = Math.abs(count);
	const mod10 = value % 10;
	const mod100 = value % 100;

	if (mod10 === 1 && mod100 !== 11) {
		return forms[0];
	}

	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
		return forms[1];
	}

	return forms[2];
}
