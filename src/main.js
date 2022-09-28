// electronモジュールをimport
const { app, BrowserWindow, globalShortcut, screen, ipcMain, Menu, dialog } = require('electron')
const path = require('path')

let window_width = 300;
let window_height = 180;


// windowの作成
const createWindow = () => {
  const win = new BrowserWindow({
    width: window_width,
    height: window_height,
    transparent: true,
    frame: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  })

  // グローバルショートカットの登録
  globalShortcut.register('Alt+Space', () => {
    // アプリのウィンドウがユーザーに見えているかチェック
    if (win.isVisible()) {
      win.hide();                 // ウィンドウを隠す
    } else {
      // 現在のマウス位置と現在のウィンドウサイズを取得
      const point = screen.getCursorScreenPoint();  
      // ウィンドウの位置を修正
      win.setPosition(point.x-(window_width/2), point.y-(window_height/2));
      // ウィンドウを表示させる          
      win.show();                                 
      win.focus();
    }
  });

  // コンテキストメニュー
  const menu = Menu.buildFromTemplate([
    {
      label: 'Close',
      role: 'close'
    },
  ])
  ipcMain.handle('showContextMenu', (event) => {
    menu.popup()
  })


  // 起動情報登録
  ipcMain.handle('dropEvent', (event, data) => {
    const child = new BrowserWindow({ 
      parent: win,      // parentに親ウィンドウ指定
      modal: true,
      show: false 
    }) 

    // htmlを指定
    //child.loadFile(path.join(__dirname, 'index.html'))
    // 表示
    child.show('ready-to-show', ()=> {
      child.show()
    })

    return data
  });

  // htmlを指定
  win.loadFile(path.join(__dirname, 'index.html'))
}

// readyイベント発生後にのみ「BrowserWindow」が呼べる仕様
app.whenReady().then(() => {
  createWindow()
  // アプリケーションがアクティブになったときに発生するイベント
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// close処理(windows&Linux）
app.on('window-all-closed', () => {
  // グローバルショートカットの削除
  globalShortcut.unregister('Alt+Space');
  if (process.platform !== 'darwin') app.quit();
})




