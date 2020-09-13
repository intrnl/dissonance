import { isObject } from '@shared/utils/misc.js';


let _require;

/**
 * Get the Webpack require function
 * @returns {any}
 */
function getWebpackRequire () {
	if (_require) return _require;

	let id = '__dissonance';

	return _require = window.webpackJsonp.push([[], {
		[id]: (module, exports, require) => {
			module.exports = require;
			delete require.m[id];
			delete require.c[id];
		},
	}, [[id]]]);
}


/**
 * Yields all Webpack module that matches a given filter
 * @param {(mod: any) => boolean} [filter]
 * @yields {any}
 */
function* getWebpackModules (filter = () => true) {
	if (typeof filter !== 'function')
		throw new TypeError('`filter` must be of type `function`');

	let require = getWebpackRequire();

	for (let i in require.c) {
		if (!require.c.hasOwnProperty(i)) continue;

		let module = require.c[i];
		let exports = module.exports;

		if (!isObject(exports)) continue;

		if ('__esModule' in exports && isObject(exports.default) && filter(exports.default))
			yield exports.default;
		else if (filter(exports))
			yield exports;
	}
}


/**
 * Finds a Webpack module that matches a given filter
 * @param {(mod: any) => boolean} [filter]
 * @returns {any}
 */
export function find (filter) {
	return getWebpackModules(filter).next().value;
}

/**
 * List all Webpack modules that matches a given filter
 * @param {(mod: any) => boolean} [filter]
 * @returns {any[]}
 */
export function findAll (filter) {
	return Array.from(getWebpackModules(filter));
}


/**
 * Creates a filter that matches on all given properties
 * @param {string[]} props Array of property names
 * @returns {(mod: any) => boolean}
 */
export function byProps (props) {
	return (mod) => props.every((prop) => mod[prop] !== undefined);
}

/**
 * Creates a filter that matches on all given prototypes
 * @param {string[]} protos Array of prototype names
 * @returns {(mod: any) => boolean}
 */
export function byPrototypes (protos) {
	return (mod) => mod.prototype &&
		protos.every((proto) => mod.prototype[proto] !== undefined);
}

/**
 * Creates a filter that matches on given display name
 * @param {string} name Display name of the component
 * @returns {(mod: any) => boolean}
 */
export function byDisplayName (name) {
	return (mod) => mod.displayName === name;
}
