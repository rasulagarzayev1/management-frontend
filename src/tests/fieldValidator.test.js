const { isStringValid, isValidNumber } = require('../utils/fieldValidator.js');

describe('String validation test: String must contains at least one character', () => {
	test('It should return true', () => {
		const str = 'hello';
		const result = isStringValid(str);
		expect(result).toBe(true);
	});
	test('It should return false', () => {
		const str = '';
		const result = isStringValid(str);
		expect(result).toBe(false);
	});
	test('It should return false', () => {
		const str = ' ';
		const result = isStringValid(str);
		expect(result).toBe(false);
	});
	test('It should return false', () => {
		const str = undefined;
		const result = isStringValid(str);
		expect(result).toBe(false);
	});
	test('It should return false', () => {
		const str = null;
		const result = isStringValid(str);
		expect(result).toBe(false);
	});
});

describe('Number validator: Field must contain only digits', () => {
	test('It should return true', () => {
		const number = '1234';
		const result = isValidNumber(number);
		expect(result).toBe(true);
	});
	test('It should return false', () => {
		const number = '';
		const result = isValidNumber(number);
		expect(result).toBe(false);
	});
	test('It should return false', () => {
		const number = ' ';
		const result = isValidNumber(number);
		expect(result).toBe(false);
	});
	test('It should return false', () => {
		const number = '8qw34kd';
		const result = isValidNumber(number);
		expect(result).toBe(false);
	});
});
