/** @type {Window} */
export let root;

/** @type {'preload'|'web'} */
export let rootType;

try {
	root = require('electron').webFrame.top.context;
	rootType = 'preload';
} catch {
	root = window;
	rootType = 'web';
}
