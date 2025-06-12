import { expect, test, describe } from "vitest";
import { add } from "./index.js";

describe("Add Function", (t) => {
	const inputOutputMap = new Map([
		["", 0],
		["1", 1],
		["1,5", 6],
		["1\n2,3", 6],
		["//;\n1;2", 3],
	]);

	for (const [input, output] of inputOutputMap) {
		test(`Input String("${input}")`, () => {
			expect(add(input)).toBe(output);
		});
	}
});
