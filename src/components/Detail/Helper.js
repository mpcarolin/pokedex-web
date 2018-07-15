
// should pad out a non-negative number by prepending maxDigits-num.length 
// zeroes to the front
export const getPaddedNumber = (num, maxDigits) => {
	let numStr = String(num)
	while (numStr.length < maxDigits) {
		numStr = "0" + numStr	
	}
	return numStr
}

const toPascal = (word) => word.charAt(0).toUpperCase() + word.substring(1)
export const toPascalCase = (str) => {
	const words = str.split(" ")
	return words.map(toPascal).join(" ")
}

export default { getPaddedNumber, toPascalCase }
