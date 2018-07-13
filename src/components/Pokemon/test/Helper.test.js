import Helper from '../Helper.js';
import Types from '../../../enums/types.js'

const pokemon = {
	name: "Bulbasaur",
	id: 1,
	icon: require("../../../assets/icons/pokemon/regular/bulbasaur.png"),
	types: [Types.GRASS, Types.POISON]
}

test('matches', () => {
	it('returns true for a full match', () => {
		expect(Helper.matches(pokemon, "Bulb", Types.GRASS)).toBe(true)	
	})

	it('returns false for text match and type mismatch', () => {
		expect(Helper.matches(pokemon, "asaur", Types.FLYING)).toBe(false)	
	})

	it('returns false for type match and text mismatch', () => {
		expect(Helper.matches(pokemon, "zzz", Types.GRASS)).toBe(false)	
	})

	it('returns false for full mismatch', () => {
		expect(Helper.matches(pokemon, "zzz", Types.WATER)).toBe(false)	
	})

	it('returns false for full mismatch', () => {
		expect(Helper.matches(pokemon, "zzz", Types.WATER)).toBe(false)	
	})

	it('treats nulls as truthy', () => {
		expect(Helper.matches(pokemon, null, Types.GRASS)).toBe(true)	
		expect(Helper.matches(pokemon, "bulb", null)).toBe(true)	
		expect(Helper.matches(pokemon, null, null)).toBe(true)	
	})

	it('ignores empty strings', () => {
		expect(Helper.matches(pokemon, "", Types.POISON)).toBe(true)	
	})

	it('ignores the any type', () => {
		expect(Helper.matches(pokemon, "bulb", "any")).toBe(true)	
	})
})

test('notEmpty', () => {
	it('returns true if string is not empty', () => {
		expect(Helper.notEmpty("hi")).toBe(true)
	})

	it('returns false if string is null', () => {
		expect(Helper.notEmpty(null)).toBe(false)
	})

	it('returns false if string is empty', () => {
		expect(Helper.notEmpty("")).toBe(false)
	})
})
