import * as path from 'path';
import { Module } from 'module';

import electron from 'electron';

import * as pkg from '../../package.json';

import { PatchedBrowserWindow } from './browserwindow.js';
import './ipc.js';


console.log('[Dissonance]', `Running version ${pkg.version}`);

let electronPath = require.resolve('electron');

// Wrap Electron's exports with a proxy
let electronExports = new Proxy(electron, {
	get (target, prop) {
		switch (prop) {
			case 'BrowserWindow': return PatchedBrowserWindow;
			default: return target[prop];
		}
	},
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = electronExports;


// - Local injection
//   - module.parent: /opt/discord-canary/resources/app/index.js
//   - require.main: /opt/discord-canary/resources/app/index.js
// - Remote injection
//   - module.parent: ~/.config/discordcanary/x.x.xxx/modules/discord_desktop_core/index.js
//   - require.main: /opt/discord-canary/resources/app.asar/app_bootstrap/index.js
if (module.parent.filename.includes('discord_desktop_core')) {
	console.log('[Dissonance]', 'Remote injection');
	// We don't have to do anything here.
} else {
	console.log('[Dissonance]', 'Local injection');
	let discordPath = path.join(path.dirname(require.main.filename), '../app.asar');
	let discordPkg = require(path.join(discordPath, './package.json'));

	electron.app.setAppPath(discordPath);
	electron.app.name = discordPkg.name;

	Module._load(path.join(discordPath, discordPkg.main), null, true);
}
