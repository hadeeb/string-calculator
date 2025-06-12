import { expect, test, describe } from "vitest";
import { add } from "./index.js";

describe("Add Function", (t) => {
	describe("Default delimiter", () => {
		const inputOutputMap = new Map([
			["", 0],
			["1", 1],
			["1,5", 6],
			["1\n2,3", 6],
		]);

		for (const [input, output] of inputOutputMap) {
			test(`Input String("${input}")`, () => {
				expect(add(input)).toBe(output);
			});
		}
	});
	describe("Custom delimiter", () => {
		const inputOutputMap = new Map([
			["//;\n1;2", 3],
			["//x\n4x6", 10],
		]);

		for (const [input, output] of inputOutputMap) {
			test(`Input String("${input}")`, () => {
				expect(add(input)).toBe(output);
			});
		}

		test("\n is not allowed as delimiter", () => {
			expect(() => add("//\n\n1\n2")).toThrow();
		});
	});
});
