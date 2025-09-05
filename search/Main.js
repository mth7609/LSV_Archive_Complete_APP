const { Worker, isMainThread } = require('node:worker_threads');
const { app, BrowserWindow, Menu, ipcMain, MessageChannelMain } = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const path = require('node:path');
const serverResponses = require('./lsv_modules/ServerResponses');
const serverFunctions = require('./lsv_modules/ServerFunctions');
const initData = require('./init.json');
const EventEmitter = require('events')
const electron = require('electron');
const fs = require('fs');
const ipp = require("ipp");
const crypto = require('crypto')
const util = require('util');
const logFile = fs.createWriteStream('console.log');

console.log = function (message) {
  //  logFile.write(util.format(message) + '\n');
  process.stdout.write(util.format(message) + '\n');
};

console.error = function (message) {
  process.stdout.write(util.format(message) + '\n');
};

console.message = function (message) {
  process.stdout.write(util.format(message) + '\n');
};

var Printer = require('ipp-printer')
var PDFDocument = require('pdfkit');

const loadingEvents = new EventEmitter();
let winMain = null;
let loginWindow = null;
let loginUser = "";
let userPolicy = "";
let loginErrorWindow = null;
let dbErrorWindow = null;
let databaseCheckWorker = null;
let frontPagesWorker = null;

serverFunctions.store.put("dbconnect", "NOK");


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createMainWindow = () => {
  winMain = new BrowserWindow({
    width: 1300,
    height: 850,
    show: false,
    frame: true,
    webPreferences: {
      "web-security": false,
      "nodeIntegration": true,
      "webviewTag": true,
      "contextIsolation": true,
      "preload": path.join(__dirname, 'preload.js')
    },
  })

  winMain.setPosition(0, 50, true);
  winMain.once('ready-to-show', () => {
    serverFunctions.createDatasetFiles();
    winMain.webContents.send('loginUser', loginUser);
    winMain.webContents.send('userPolicy', userPolicy);
    winMain.webContents.send("initData", initData);
    winMain.webContents.send("callFunctions", 1);
    winMain.webContents.send("callFunctions", 2);
    winMain.webContents.send("callFunctions", 3);
    winMain.webContents.send("callFunctions", 4);
    winMain.webContents.send("callFunctions", 5);
    //winMain.webContents.send("callFunctions", 6);
    winMain.webContents.send("callFunctions", 7);
    winMain.webContents.send("callFunctions", 8);
    winMain.webContents.send("callFunctions", 9);
    winMain.webContents.send("callFunctions", 10);
    winMain.webContents.send("callFunctions", 11);
    winMain.webContents.send("callFunctions", 12);
    winMain.webContents.send("callFunctions", 13);
    setTimeout(() => {
      winMain.show();
    }, 1000);
  })

  winMain.webContents.session.setSpellCheckerEnabled(false);

  ipcMain.on('loginCMD', (event, user, pwd, pwdSHA, policy) => {
    if (pwd === "nok") {
      loginErrorWindow.close();
      loginWindow.close();
      quitAPP();
    }

    if (user == "loginErrorClose") {
      loginWindow.show();
      loginErrorWindow.hide();
      return;
    }

    if (!pwdSHA) return;

    userPolicy = policy;
    loginUser = user;
    let inputSHA = crypto.createHash('sha256').update(pwd).digest('hex');

    //console.log(inputSHA);

    pwd = "";

    if (inputSHA === pwdSHA)
      loadingEvents.emit('finishedLogin');
    else {
      loginWindow.hide();
      loginErrorWindow.show();
    }
  })


  ipcMain.on('createNewDatasetFileCMD', (event, nr) => {
    serverFunctions.createNewDatasetFile(nr);
  })


  ipcMain.on('deleteDatasetFileCMD', (event, nr) => {
    serverFunctions.deleteDatasetFile(nr);
  })


  ipcMain.on('executeSimpleSQLCMD', (event, query) => {
    let ret = serverResponses.executeSimpleSQL(query);
    //console.log("ret: " + ret);
  })


  ipcMain.on('logCMD', (event, text) => {
    console.log(text);
  })


  winMain.on('closed', (event, query) => {
    console.log("Threads terminated");
    databaseCheckWorker.terminate();
    frontPagesWorker.terminate();
    quitAPP();
  })


  winMain.webContents.on("focus", (event, zoomDirection) => {
  })


  winMain.webContents.on("before-input-event", (event, input) => {
    if (input.code == 'F4' && input.alt) event.preventDefault();
  });


  winMain.webContents.on("zoom-changed", (event, zoomDirection) => {
    var currentZoom = winMain.webContents.getZoomFactor();
    if (zoomDirection === "in" && currentZoom < 1.2) {
      winMain.webContents.zoomFactor = currentZoom + 0.1;
    }

    if (zoomDirection === "out" && currentZoom > 0.6) {
      winMain.webContents.zoomFactor = currentZoom - 0.1;
    }
  });

  electronLocalshortcut.register('CommandOrControl+D', () => {
    winMain.webContents.toggleDevTools();
  })

  winMain.removeMenu();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createLoginWindow = () => {
  loginWindow = new BrowserWindow({
    width: 500,
    height: 470,
    frame: true,
    show: false,
    alwaysOnTop: false,
    webPreferences: {
      "nodeIntegration": true,
      "contextIsolation": true,
      "preload": path.join(__dirname, 'preload.js')
    }
  });

  loginWindow.loadFile('./login.html').then(() => {
    loginWindow.center();
  }).catch(error => {
    console.error('Error loading login window:', error);
  });

  loginWindow.on('closed', () => {
    loginWindow.removeAllListeners()
    loginWindow = null;
  })
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createDbErrorWindow = () => {
  dbErrorWindow = new BrowserWindow({
    width: 500,
    height: 250,
    frame: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      "nodeIntegration": true,
      "contextIsolation": true,
      "preload": path.join(__dirname, 'preload.js')
    }
  });

  dbErrorWindow.loadFile('./dbErrorWindow.html').then(() => {
    dbErrorWindow.center();
  }).catch(error => {
    console.error('Error loading database error message window: ', error);
  });

  dbErrorWindow.on('closed', () => {
    dbErrorWindow.removeAllListeners()
    app.quit();
  })
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createLoginErrorWindow = () => {
  //console.log("Entry createLoginErrorWindow");
  loginErrorWindow = new BrowserWindow({
    width: 500,
    height: 230,
    frame: false,
    show: false,
    alwaysOnTop: true,
    webPreferences: {
      "nodeIntegration": true,
      "contextIsolation": true,
      "preload": path.join(__dirname, 'preload.js')
    }
  });

  loginErrorWindow.loadFile('./loginErrorWindow.html').then(() => {
    loginErrorWindow.center();
  }).catch(error => {
    console.error('Error loading login message window:', error);
  });

  loginErrorWindow.on('loginErrorCancel', () => {
    loginWindow.show();
    loginErrorWindow.hide();
  })
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

loadingEvents.on('finishedLogin', async () => {
  try {
    loginWindow.close();
    if (loginUser == "Sucher" || loginUser == "SucherAdmin")
      winMain.loadFile('./index.html');
    else
      winMain.loadFile('./index.html');

    winMain.webContents.toggleDevTools();  // To be removed

    //winMain.center();
    setTimeout(() => {
      if (serverFunctions.store.get("dbconnect") != "NOK") {
        createWorkerThread();
        console.log("Threads started");
      }
    }, 500);
  } catch (error) {
    console.error('Error loading index.html: ', error);
  }
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.on("web-contents-created", (event, contents) => {
  contents.on("devtools-opened", () => contents.devToolsWebContents?.executeJavaScript(`
        (() => {
            const origErr = console.error;
            console.error = function (...args) {
                const s = String(args[0] ?? "");
                if (s.includes("Autofill.enable") || s.includes("Autofill.setAddresses")) return;
                return origErr.apply(console, args);
            };
        })()
    `));
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const createWorkerThread = () => {
  if (isMainThread) {
    databaseCheckWorker = new Worker("./lsv_modules/DatabaseThread.js");
    databaseCheckWorker.postMessage("Start");
    databaseCheckWorker.on('message', (message) => {
      if (winMain)
        winMain.webContents.send('dbStatus', message);
      if (message === "NOK") {
        if (dbErrorWindow) {
          if (loginWindow) loginWindow.hide();
          if (loginErrorWindow) loginErrorWindow.hide();
          dbErrorWindow.show();
        }
      }
      else {
        if (dbErrorWindow) dbErrorWindow.hide();
      }
    });

    frontPagesWorker = new Worker("./lsv_modules/FrontPagesThread.js");
    frontPagesWorker.on('message', (message) => {
      if (winMain)
        winMain.webContents.send('frontPage', message);
    });
    frontPagesWorker.postMessage("Start");
  }
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


app.whenReady().then(() => {
  console.log("Starting application");
  serverFunctions.serverOpen();
  console.log("Local HTTP server started");
  serverResponses.databaseServerConnect();
  createDbErrorWindow();

  app.commandLine.appendSwitch('high-dpi-support', 1)
  app.commandLine.appendSwitch('force-device-scale-factor', 1)

  setTimeout(() => {
    if (serverFunctions.store.get("dbconnect") == "NOK") {
      console.log("NOT connected to database");
      serverResponses.databaseServerClose();
      dbErrorWindow.show();
    }
    else
      console.log("Connected to database");
  }, 1000);

  setTimeout(() => {
    if (serverFunctions.store.get("dbconnect") != "NOK") {
      createLoginWindow();
      console.log("Login window created");
    }
  }, 1500);

  setTimeout(() => {
    if (serverFunctions.store.get("dbconnect") != "NOK") {
      createLoginErrorWindow();
      console.log("Login error window created");
    }
  }, 2000);

  setTimeout(() => {
    if (serverFunctions.store.get("dbconnect") != "NOK") {
      createMainWindow();
      console.log("Main window created");
      winMain.webContents.send('dbStatus', "Checking...");
    }
  }, 2500);

  setTimeout(() => {
    if (serverFunctions.store.get("dbconnect") != "NOK") {
      loginWindow.show();
      console.log("Login window running");
    }
  }, 3000);

  app.on('quit', () => {
    quitAPP;
  })
});


function quitAPP() {
  console.log("Disconnect database");
  serverResponses.databaseServerClose();
  setTimeout(() => {
    serverFunctions.serverClose();
  }, 500);
  setTimeout(() => {
    if (process.platform !== 'darwin') {
      winMain.removeAllListeners()
      winMain = null;
      app.quit();
      console.log("The End");
    }
  }, 1000);
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//electron-packager . LSV-Archiv --overwrite--prune=false
//