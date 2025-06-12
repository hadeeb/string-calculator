import { expect, test, describe } from "vitest";
import { add, NegativeError } from "./index.js";

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

	describe("Negative numbers", () => {
		const inputErrorMap = new Map([
			["-1,2", [-1]],
			["-10,-11", [-10, -11]],
		]);

		for (const [input, output] of inputErrorMap) {
			test(`Input String("${input}")`, () => {
				const error = new NegativeError(output);
				expect(() => add(input)).toThrowError(error);
			});
		}
	});

	describe("Ignore numbers > 1000", () => {
		const inputOutputMap = new Map([
			["1,999", 1000],
			["1,1000", 1001],
			["2\n1001", 2],
			["//x\n4000x6", 6],
			["//;\n1001;2", 2],
		]);

		for (const [input, output] of inputOutputMap) {
			test(`Input String("${input}")`, () => {
				expect(add(input)).toBe(output);
			});
		}
	});
});
