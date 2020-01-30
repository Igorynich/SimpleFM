// const { app, BrowserWindow } = require('electron');
import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import * as url from 'url';
import * as path from 'path';
// @ts-ignore
import { version } from './package.json';

// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
let win: BrowserWindow = null;

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow() {
  // Создаём окно браузера.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    title: 'SimpleFM'
  });
  win.removeMenu();
  loadApp(win);

  // Будет вызвано, когда окно будет закрыто.
  win.on('closed', () => {
    // Разбирает объект окна, обычно вы можете хранить окна
    // в массиве, если ваше приложение поддерживает несколько окон в это время,
    // тогда вы должны удалить соответствующий элемент.
    win = null;
  });
}

let tray: Tray;

function createTray(): Tray {
  console.log('Dirname', __dirname);
  tray = serve
    ? new Tray(path.join(__dirname, 'src/favicon.ico'))
    : new Tray(path.join(__dirname, 'dist/favicon.ico'));

  const menu = Menu.buildFromTemplate([
    /*{
      label: 'Open Settings',
      type: 'normal',
      click: () => win.webContents.send('show-user-settings'),
    },
    {
      label: 'Restore Focus',
      type: 'normal',
      click: () => win.setIgnoreMouseEvents(true),
    },*/
    {
      label: 'Exit',
      type: 'normal',
      click: () => app.quit()
    }
  ]);
  tray.setToolTip(`SimpleFM: ${version}`);
  tray.setContextMenu(menu);
  return tray;
}

// Этот метод будет вызываться, когда Electron закончит
// инициализацию и готов к созданию окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
app.on('ready', () => {
  createWindow();
  createTray();
});

// Выходим, когда все окна будут закрыты.
app.on('window-all-closed', () => {
  // Для приложений и строки меню в macOS является обычным делом оставаться
  // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // На MacOS обычно пересоздают окно в приложении,
  // после того, как на иконку в доке нажали и других открытых окон нету.
  if (win === null) {
    createWindow();
  }
});

function loadApp(window: BrowserWindow, route: string = '') {
  if (serve) {
    console.log('lalala');
    require('electron-reload')(__dirname, {
      // electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
      electron: require(`${__dirname}/node_modules/electron`)
    });
    window.loadURL('http://localhost:4200' + route);
  } else {
    const appUrl = url.format({
      pathname: path.join(__dirname, 'dist/SimpleFM/index.html'),
      protocol: 'file:',
      slashes: true
    });
    window.loadURL(appUrl + route);
  }

  if (serve) {
    window.webContents.openDevTools({mode: 'undocked'});
  }
}
