"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { app, BrowserWindow } = require('electron');
var electron_1 = require("electron");
var url = require("url");
var path = require("path");
// @ts-ignore
var package_json_1 = require("./package.json");
// Храните глобальную ссылку на объект окна, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирает мусор.
var win = null;
var args = process.argv.slice(1);
var serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    // Создаём окно браузера.
    win = new electron_1.BrowserWindow({
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
    win.on('closed', function () {
        // Разбирает объект окна, обычно вы можете хранить окна
        // в массиве, если ваше приложение поддерживает несколько окон в это время,
        // тогда вы должны удалить соответствующий элемент.
        win = null;
    });
}
var tray;
function createTray() {
    console.log('Dirname', __dirname);
    tray = serve
        ? new electron_1.Tray(path.join(__dirname, 'src/favicon.ico'))
        : new electron_1.Tray(path.join(__dirname, 'dist/favicon.ico'));
    var menu = electron_1.Menu.buildFromTemplate([
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
            click: function () { return electron_1.app.quit(); }
        }
    ]);
    tray.setToolTip("SimpleFM: " + package_json_1.version);
    tray.setContextMenu(menu);
    return tray;
}
// Этот метод будет вызываться, когда Electron закончит
// инициализацию и готов к созданию окон браузера.
// Некоторые API могут использоваться только после возникновения этого события.
electron_1.app.on('ready', function () {
    createWindow();
    createTray();
});
// Выходим, когда все окна будут закрыты.
electron_1.app.on('window-all-closed', function () {
    // Для приложений и строки меню в macOS является обычным делом оставаться
    // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // На MacOS обычно пересоздают окно в приложении,
    // после того, как на иконку в доке нажали и других открытых окон нету.
    if (win === null) {
        createWindow();
    }
});
function loadApp(window, route) {
    if (route === void 0) { route = ''; }
    if (serve) {
        console.log('lalala');
        require('electron-reload')(__dirname, {
            // electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
            electron: require(__dirname + "/node_modules/electron")
        });
        window.loadURL('http://localhost:4200' + route);
    }
    else {
        var appUrl = url.format({
            pathname: path.join(__dirname, 'dist/SimpleFM/index.html'),
            protocol: 'file:',
            slashes: true
        });
        window.loadURL(appUrl + route);
    }
    if (serve) {
        window.webContents.openDevTools({ mode: 'undocked' });
    }
}
//# sourceMappingURL=main.js.map