const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
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
  

    //win.removeMenu()
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

