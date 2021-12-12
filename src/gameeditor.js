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

if (typeof db === 'undefined') {
    // the variable is undefined
    const db = require('electron-db');
}

function EditorFillup(){
    // load the savefile
    
    // 1. go through the list in template;
    // for every tag, look for the corresponding tag and insert the data there. 

    // 2. loop through every constants/consequents 
    // set them to not be editable

}