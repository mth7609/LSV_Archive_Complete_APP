const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  closeLogin: (user, pwd, pwdSHA, policy) => ipcRenderer.send("loginCMD", user, pwd, pwdSHA, policy),
  closeLoginErrorWindow: () => ipcRenderer.send("closeLoginErrorWindowCMD"),
  closeDbErrorWindow: () => ipcRenderer.send("closeDbErrorWindoCMD"),
  openSearchProcess: () => ipcRenderer.send('openSearchProcessCMD'),
  closeSearchProcess: () => ipcRenderer.send('closeSearchProcessCMD'),
  closeMainProcess: () => ipcRenderer.send('closeMainProcessCMD'),
  createNewDatasetFile: (nr) => ipcRenderer.send('createNewDatasetFileCMD', nr),
  deleteDatasetFile: (nr) => ipcRenderer.send('deleteDatasetFileCMD', nr),
  log: (text) => ipcRenderer.send('logCMD', text),
  executeSimpleSQL: (dataset) => ipcRenderer.send('executeSimpleSQLCMD', dataset),
  getHttpPort: (callback) => ipcRenderer.on('httpPort', (_event, value) => callback(value)),
  getLoginUser: (callback) => ipcRenderer.on('loginUser', (_event, value) => callback(value)),
  getUserPolicy: (callback) => ipcRenderer.on('userPolicy', (_event, value) => callback(value)),
  getDbStatus: (callback) => ipcRenderer.on('dbStatus', (_event, value) => callback(value)),
  getMessage: (callback) => ipcRenderer.on('message', (_event, value) => callback(value)),
  getFrontPages: (callback) => ipcRenderer.on('frontPage', (_event, value) => callback(value)),
  getDataset: (callback) => ipcRenderer.on('requestedDataset', (_event, value) => callback(value)),
  getInitData: (callback) => ipcRenderer.on('initData', (_event, value) => callback(value)),
  getQuit: (callback) => ipcRenderer.on('quit', (_event) => callback()),
  getCallFunctionsFromMain: (callback) => ipcRenderer.on('callFunctions', (_event, value) => callback(value))
})

