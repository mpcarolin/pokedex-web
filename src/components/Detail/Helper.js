
// should pad out a non-negative number by prepending maxDigits-num.length 
// zeroes to the front
export const getPaddedNumber = (num, maxDigits) => {
	let numStr = String(num)
	while (numStr.length < maxDigits) {
		numStr = "0" + numStr	
	}
	return numStr
}

export default {getPaddedNumber}
