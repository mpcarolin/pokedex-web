import Helper from '../Helper.js'

describe('getPaddedNumber', () => {
	it('pads a number with zeroes', () => {
		const padded = Helper.getPaddedNumber(5, 3)
		expect(padded).toBe("005")
	})	

	it('does not pad a number that is at the right digit count', () => {
		expect(Helper.getPaddedNumber(500, 3)).toBe("500")
	})

	it('pads an empty string with zeroes', () => {
		expect(Helper.getPaddedNumber("", 3)).toBe("000")
	})

	it('does not pad a number that exceeds the digit count', () => {
		expect(Helper.getPaddedNumber(50, 1)).toBe("50")
	})
})

describe('toPascalCase', () => {
	const s = "john jumped away"
	it('capitalizes each word', () => {
		expect(Helper.toPascalCase(s)).toBe("John Jumped Away")
	})	

	it('works with a single word', () => {
		expect(Helper.toPascalCase("hello")).toBe("Hello")
	})

	it('ignores empty strings', () => {
		expect(Helper.toPascalCase("")).toBe("")
	})
})