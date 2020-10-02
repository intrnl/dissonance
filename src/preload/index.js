import { ipcRenderer } from 'electron';

import * as pkg from '../../package.json';
import { IPC_GET_PRELOAD } from '../shared/constants/ipc.js';


console.log('[Dissonance]', `Running version ${pkg.version}`);

// Discord uses contextBridge to expose DiscordNative, but the method throws
// if context isolation is disabled, so we have to void it.
// contextBridge.exposeInMainWorld = () => void 0;

// Load any original preload if present.
let originalPreload = ipcRenderer.sendSync(IPC_GET_PRELOAD);
if (originalPreload) require(originalPreload);

// Load the client mod
require('./core.js');
