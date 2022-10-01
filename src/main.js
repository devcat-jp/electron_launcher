// electronモジュールをimport
const { app, BrowserWindow, globalShortcut, screen, ipcMain, Menu, dialog } = require('electron')
const path = require('path')
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./src/data/data.db");


let window_width = 300;
let window_height = 180;
let register_width = 400;
let register_height = 300;


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
      label: 'close',
      role: 'close'
    },
  ])
  ipcMain.handle('showContextMenu', (event) => {
    menu.popup()
  })

  // ボタンクリックイベント
  ipcMain.handle('buttonClick', (event, data) => {

    dialog.showErrorBox("info", String(data))
  })

  // 起動情報登録
  ipcMain.handle('dropEvent', (event, data) => {
    const child = new BrowserWindow({ 
      parent: win,      // parentに親ウィンドウ指定
      modal: true,
      width: register_width,
      height: register_height,
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

// テーブルがない場合は作成を行う
const createDB = () => {
  db.serialize(() => {
    db.run("create table if not exists launcher(key,status,execPath)")
  })
}


// readyイベント発生後にのみ「BrowserWindow」が呼べる仕様
app.whenReady().then(() => {
  // ランチャーの登録情報読み込み
  createDB()
  createWindow()
})

// close処理(windows&Linux）
app.on('window-all-closed', () => {
  globalShortcut.unregister('Alt+Space');         // グローバルショートカットの削除
  db.close();
  if (process.platform !== 'darwin') app.quit();
})




