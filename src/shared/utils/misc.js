/**
 * Checks if value is an object
 * @param {any} value
 */
export function isObject (value) {
	return value && typeof value === 'object';
}

/**
 * Checks if object has own property
 * @param {object} object
 * @param {string} prop
 * @returns {boolean}
 */
export function hasOwnProperty (object, prop) {
	return Object.prototype.hasOwnProperty.call(object, prop);
}
