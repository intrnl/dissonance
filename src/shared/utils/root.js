/** @type {Window} */
export let root;

/** @type {'preload'|'web'} */
export let rootType;

/** @type {boolean} */
export let isContextIsolated = false;

try {
	let { webFrame } = require('electron');

	root = webFrame.top.context;
	rootType = 'preload';

	isContextIsolated = window !== webFrame.top.context;
} catch {
	root = window;
	rootType = 'web';
}
