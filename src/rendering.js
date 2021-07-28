if (typeof db === 'undefined') {
    // the variable is undefined
    const db = require('electron-db');
}

function Rendering() {

    // get the div we're rendering into first
    let target = document.getElementById("renderingT")
    target.innerHTML = "derp"

    // get all game objects from id
    let arr = db.getAll('games', (succ, data) => {

        console.log(succ);
        console.log(data);
        // iterate through object array
        // target.insertAdjacentHTML('beforeend', "<table>")
        let loop = 0
        for (let index in data) {

            let str = "<tr>"
            str += '<th><img src="https://steamcdn-a.akamaihd.net/steam/apps/' + String(data[index].appid) + '/capsule_184x69.jpg"></img></th>'
            str += "<th>" + data[index].appid + "</th>"
            str += "<th>" + data[index].name + "</th>"
            str += "</tr>"

            target.insertAdjacentHTML('beforeend', str)
            // console.log(str)
            loop++
        }
        // target.insertAdjacentHTML('beforeend', "</table>")
        console.log(target)
        console.log(loop)
    })
}

document.getElementById("rendering").addEventListener("click", Rendering);