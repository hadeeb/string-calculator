export class NegativeError extends Error {
	constructor(numbers: Array<number>) {
		super(`negative numbers not allowed ${numbers.join(",")}`);
	}
}

function parseDelimiter(delimiter: string): RegExp | string {
	if (delimiter.length === 1) return delimiter;
	// delimiter can be of shape `[xxx][y]`
	// split at ][, and strip off any remaining square brackets
	const delimiters = delimiter
		.split("][")
		.map((part) => part.replaceAll(/[\]\[]/g, ""));

	// create a regexp with the list
	const regexpBody = delimiters
		// prefix regex special characters with \
		// Ignoring [ and ] as they are used for delimiter grouping
		// and are already stripped off
		.map((part) =>
			part.replaceAll(/[.*+?^${}()|\\]/g, (character) => `\\${character}`),
		)
		.join("|");
	return new RegExp(regexpBody);
}

function getInputDelimiterAndOperation(numbers: string): {
	input: string;
	delimiter: string | RegExp;
	operation: (numbers: Array<number>) => number;
} {
	const delimiterPrefix = "//";
	if (numbers.startsWith(delimiterPrefix)) {
		// Split the first line and the rest
		const [delimiterLine, rest] = numbers.split("\n", 2);
		const delimiter = delimiterLine.slice(delimiterPrefix.length);
		// If delimiter is empty or \n, this will be empty
		if (delimiter === "") throw new TypeError("No/Invalid delimiter");

		if (delimiter === "*") {
			return {
				input: rest,
				delimiter: parseDelimiter(delimiter),
				operation: calculateProduct,
			};
		}

		return {
			input: rest,
			delimiter: parseDelimiter(delimiter),
			operation: calculateSum,
		};
	}

	// Return the default delimiter
	return { input: numbers, delimiter: /[,\n]/, operation: calculateSum };
}

function parseNumbers(stringList: Array<string>) {
	const negativeNumbers: Array<number> = [];
	const validNumbers: Array<number> = [];

	const integers = stringList.map((num) => Number.parseInt(num.trim(), 10));
	for (const num of integers) {
		if (num < 0) {
			negativeNumbers.push(num);
		} else if (num > 1000) {
			// continue
		} else {
			validNumbers.push(num);
		}
	}

	return { negativeNumbers, validNumbers };
}

function calculateSum(numbers: Array<number>) {
	return numbers.reduce((sum, num) => sum + num, 0);
}

function calculateProduct(numbers: Array<number>) {
	return numbers.reduce((acc, num) => acc * num, 1);
}

export function add(numbers: string): number {
	const cleanedString = numbers.trim();
	if (cleanedString === "") return 0;
	const { input, delimiter, operation } =
		getInputDelimiterAndOperation(cleanedString);

	const stringList = input.split(delimiter);

	const { negativeNumbers, validNumbers } = parseNumbers(stringList);

	if (negativeNumbers.length > 0) {
		throw new NegativeError(negativeNumbers);
	}

	return operation(validNumbers);
}
