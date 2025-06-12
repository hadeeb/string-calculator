export function add(numbers: string): number {
	const cleanedString = numbers.trim();
	if (cleanedString === "") return 0;

	return cleanedString
		.split(/[,\n]/)
		.map((num) => Number.parseInt(num.trim()), 10)
		.reduce((sum, num) => sum + num, 0);
}
