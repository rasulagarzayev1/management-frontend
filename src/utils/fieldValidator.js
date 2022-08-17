/* eslint-disable no-undef */

const isStringValid = (str) => {
	if (!str?.trim()?.length || !str) {
		return false;
	}

	return true;
};

const isValidNumber = (num) => {
	return /^[0-9]+$/.test(num);
};

module.exports = {
	isStringValid,
	isValidNumber,
};
