import { isObject, hasOwnProperty } from './misc.js';


/**
 * Find matched object or array in a tree
 * @param {object} tree
 * @param {(obj: object) => boolean} filter
 * @param {object} [opts]
 * @param {string[] | null} [opts.walkable=null]
 * @param {string[]} [opts.ignore=[]]
 * @returns {any}
 */
export function findInTree (tree, filter, opts) {
	let { walkable = null, ignore = [] } = opts;

	if (typeof filter !== 'function')
		throw new Error('`filter` must be of type `function`');

	if (!isObject(tree)) return;
	if (filter(tree)) return tree;

	let stack = [tree];

	while (stack.length) {
		let curr = stack.shift();

		if (Array.isArray(curr)) {
			for (let value of curr) {
				if (isObject(value)) {
					if (filter(value)) return value;
					stack.push(value);
				}
			}
		} else {
			for (let key in curr) {
				if (!hasOwnProperty(curr, key)) continue;
				if (ignore.includes(key)) continue;
				if (walkable && !walkable.includes(key)) continue;

				let value = curr[key];
				if (isObject(value)) {
					if (filter(value)) return value;
					stack.push(value);
				}
			}
		}
	}
}

/**
 * Find matched object or array in a React tree
 * @param {object} tree
 * @param {(obj: object) => boolean} filter
 */
export function findInReactTree (tree, filter) {
	return findInTree(tree, filter, { walkable: ['props', 'children'] });
}
