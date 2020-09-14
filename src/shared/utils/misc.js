/**
 * Checks if value is an object
 * @param {any} value
 */
export function isObject (value) {
	return value && typeof value === 'object';
}

export function isPlainObject (value) {
	return isObject(value) && !Array.isArray(value);
}
