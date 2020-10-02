/** @type {Window} */
export let root;

/** @type {'preload'|'web'} */
export let rootType;

/** @type {boolean} */
export let isContextIsolated = false;

try {
	let { webFrame } = require('electron');

	// Preload, when context isolation is enabled, runs on its own web frame
	// and the parent attached to it is the actual website frame, which allows us
	// to pretty much access its context without having to disable context
	// isolation.

	// The `top` field recurses when you are the absolute parent web frame.

	root = webFrame.top.context;
	rootType = 'preload';

	isContextIsolated = window !== webFrame.top.context;
} catch {
	root = window;
	rootType = 'web';
}
