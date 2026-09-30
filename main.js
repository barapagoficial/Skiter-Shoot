const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    title: 'Skiter',
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#f6f3e6',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, 'index.html'));
}

ipcMain.on('dd-win', (e, act) => {
  const w = BrowserWindow.fromWebContents(e.sender);
  if (!w) return;
  if (act === 'min') w.minimize();
  else if (act === 'max') {
    if (w.isMaximized()) w.unmaximize();
    else w.maximize();
  } else if (act === 'close') w.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
