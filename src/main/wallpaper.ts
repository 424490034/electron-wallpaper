import Electron, { BrowserWindow } from 'electron';
import { attach } from 'electron-as-wallpaper';

type CreateWallpaperProps = {
  display: Electron.Display;
};

export default async ({ display }: CreateWallpaperProps) => {
  let wallWindow: BrowserWindow | null = null;
  if (!wallWindow) {
    wallWindow = new BrowserWindow({
      opacity: 0,
      // transparent: true,
      frame: false,
      fullscreen: true,
      webPreferences: {
        webSecurity: false,
        devTools: process.env.NODE_ENV === 'development',
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        // nodeIntegrationInSubFrames: true,
        contextIsolation: true,
      },
    });

    wallWindow?.setBounds(display.bounds);

    await wallWindow.loadURL('https://www.google.com');

    if (wallWindow) {
      attach(wallWindow, {
        transparent: true,
        forwardKeyboardInput: true,
        forwardMouseInput: true,
      });
    }
  }
  return wallWindow;
};
