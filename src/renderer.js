

document.getElementById('clickButton0').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton1').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton2').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton3').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton4').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton5').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton6').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton7').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton8').onclick = () => {
    console.log("aaaa")
}
document.getElementById('clickButton9').onclick = () => {
    console.log("aaaa")
}



// dragイベントの登録
document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // ファイル分繰り返す
    for (const f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        registerInfo(f.path)
    }
});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

// 起動情報登録
const registerInfo = async (path) => {
    // 例としてはmain.jsにパスを伝達し、パスを戻す
    const response = await window.api.dropEvent(path)
}

// コンテキストメニューイベント
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.api.showContextMenu()
})