const { app, BrowserWindow, ipcRenderer } = require('electron')
const path = require('path')

const db = require('electron-db')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true

            //preload: path.join(__dirname, 'apitest.js')
        }
    })

    db.createTable('games', (succ, msg) => {
        // succ - boolean, tells if the call is successful
        console.log("Creation Success: " + succ);
        console.log("Message: " + msg);
    })

    //win.removeMenu()
    console.log("Finished setting up, now booting up!")
    win.loadFile('src/index.html')
}

/* to make electron create the window we need. */
app.whenReady().then(() => {
    createWindow()

    // for macOS; open a window if none are open.
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

/*
Whereas Linux and Windows apps quit when they have
no windows open, macOS apps generally continue running 
even without any windows open, and activating the app 
when no windows are available should open a new one.
*/

// darwin --> macOS.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

/*
Here we'll handle the message recieving/sending by main
*/
const { ipcMain } = require('electron')
var openWindowList = new Array()

ipcMain.on("new-window-request", (event, id) => {

    if (openWindowList.includes(id)) {
        // reject the request to open
        event.returnValue = "0";
        return;
    } 

    console.log ("handle open window request")

})