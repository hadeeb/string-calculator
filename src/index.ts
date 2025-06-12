export class NegativeError extends Error {
	constructor(numbers: Array<number>) {
		super(`negative numbers not allowed ${numbers.join(",")}`);
	}
}

function parseDelimiter(delimiter: string): string {
	if (delimiter.length === 1) return delimiter;
	// delimiter can be of shape `[xxx]`
	// strip the first and last characters
	return delimiter.slice(1, -1);
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

		return { input: rest, delimiter: parseDelimiter(delimiter) };
	}

	// Return the default delimiter
	return { input: numbers, delimiter: /[,\n]/ };
}

export function add(numbers: string): number {
	const cleanedString = numbers.trim();
	if (cleanedString === "") return 0;
	const { input, delimiter } = getInputAndDelimiter(cleanedString);

	const integers = input
		.split(delimiter)
		.map((num) => Number.parseInt(num.trim()), 10);

	const negativeNumbers: Array<number> = [];
	let sum = 0;
	for (const num of integers) {
		if (num < 0) {
			negativeNumbers.push(num);
		} else if (num > 1000) {
			// continue
		} else {
			sum += num;
		}
	}

	if (negativeNumbers.length > 0) {
		throw new NegativeError(negativeNumbers);
	}

	return sum;
}
