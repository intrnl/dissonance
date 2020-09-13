import * as path from 'path';

import { BrowserWindow } from 'electron';


let PRELOAD_PATH = path.join(__dirname, './preload.js');

export class PatchedBrowserWindow extends BrowserWindow {
	constructor (opts = {}) {
		let originalPreload = opts.webPreferences?.preload;

		if (!opts.dissonanceBypass) {
			if (opts.webContents) {
				// General purpose popouts
			} else if (opts.webPreferences?.nodeIntegration) {
				// Splash screen
			} else if (opts.webPreferences?.offscreen) {
				// Overlay
			} else if (opts.webPreferences?.preload) {
				// Discord client
				opts.webPreferences.preload = PRELOAD_PATH;
				opts.webPreferences.contextIsolation = false;
			}
		}

		let browserWindow = new BrowserWindow(opts);
		browserWindow.webContents.__originalPreload = originalPreload;

		return browserWindow;
	}
}
