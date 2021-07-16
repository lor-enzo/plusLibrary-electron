const storage = require('electron-json-storage');

function SMstartup(){
// 1. locate where storage is
console.log(storage.getDefaultDataPath());
// 2. check if our storage file exists
// 3. if not, prompt if we want to make one?
}

document.getElementById("storagemanagement").addEventListener("click", SMstartup());