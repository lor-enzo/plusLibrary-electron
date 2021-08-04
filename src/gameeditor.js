//const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams)
    const id = urlParams.get('id')

    console.log(id);

    document.getElementById('appid').innerText = id;
})
