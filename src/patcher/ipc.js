import { ipcMain } from 'electron';

import { IPC_GET_PRELOAD } from '@shared/constants/ipc.js';


ipcMain.on(IPC_GET_PRELOAD, (ev) => ev.returnValue = ev.sender.__originalPreload);
