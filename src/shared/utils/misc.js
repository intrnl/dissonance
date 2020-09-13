export function isObject (value) {
	return value && typeof value === 'object';
}

export function isPlainObject (value) {
	return isObject(value) && !Array.isArray(value);
}
