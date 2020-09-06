const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
let mainWindow;
const SerialPort = require('serialport')
const port = new SerialPort('COM6', {
  baudRate: 9600
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function createWindow() {
    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "../index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: {nodeIntegration: true, devTools: true} });
    mainWindow.loadURL(startUrl);
    mainWindow.webContents.openDevTools()
    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    ipcMain.on("componentClicked", async (event, args) => {
        port.write("0");
        await sleep(1000)
        event.returnValue = 'ok';
    });
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
