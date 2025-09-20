const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  win.loadURL(url.pathToFileURL(indexPath).toString());
  win.removeMenu();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
