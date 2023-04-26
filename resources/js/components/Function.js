const FUNCTION = {}
FUNCTION.ucwords = (str) => {
	return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	})
}

export default FUNCTION