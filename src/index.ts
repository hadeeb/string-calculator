export class NegativeError extends Error {
	constructor(numbers: Array<number>) {
		super(`negative numbers not allowed ${numbers.join(",")}`);
	}
}

function getInputAndDelimiter(numbers: string): {
	input: string;
	delimiter: string | RegExp;
} {
	const delimiterPrefix = "//";
	if (numbers.startsWith(delimiterPrefix)) {
		// Split the first line and the rest
		const [delimiterLine, rest] = numbers.split("\n", 2);
		const delimiter = delimiterLine.slice(delimiterPrefix.length);
		// If delimiter is empty or \n, this will be empty
		if (delimiter === "") throw new TypeError("No/Invalid delimiter");
		return { input: rest, delimiter };
	}

	// Return the default delimiter
	return { input: numbers, delimiter: /[,\n]/ };
}

export function add(numbers: string): number {
	const cleanedString = numbers.trim();
	if (cleanedString === "") return 0;
	const { input, delimiter } = getInputAndDelimiter(cleanedString);

	return input
		.split(delimiter)
		.map((num) => Number.parseInt(num.trim()), 10)
		.reduce((sum, num) => sum + num, 0);
}
