import Helper from '../Helper.js'

test('getPaddedNumber', () => {
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