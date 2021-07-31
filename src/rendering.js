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
        target.insertAdjacentHTML('beforeend',
            "<tr><th>APPIMAGE</th><th>APPID</th><th>NAME</th><th>HRS</th><th>2WEEKS</th><th>$/HR</th><th>COST</th><th>RATING</th><th>NOTES</th><th>COMPLETED?</th><th>DATEOBTAINED</th><th>DATECOMPLETED</th>")
        let loop = 0
        for (let index in data) {

            let str = "<tr id='" + data[index].appid + "'>"
            str += '<td class="capsuled"><img class="capsuleimg" src="https://steamcdn-a.akamaihd.net/steam/apps/' + String(data[index].appid) + '/capsule_184x69.jpg"></img></td>'
            str += "<td class='appid'>" + data[index].appid + "</td>"
            str += "<td class='appname'>" + data[index].name + "</td>"

            str += "<td class='playtimetotal'>" + data[index].playtime['total'] + "</td>"
            str += "<td class='playtimetotal'>" + data[index].playtime['2weeks'] + "</td>"
            str += "<td class='dollarperhour'>" + data[index].dollarperhour.total + "</td>"
            str += "<td class='cost'>" + data[index].appid + "</td>"

            str += "<td class='rating'>" + data[index].rating + "</td>"
            str += "<td class='notes'>" + data[index].notes + "</td>"
            str += "<td class='completed'>" + data[index].completed + "</td>"

            str += "<td class='dateobtained'>" + data[index].dateobtained + "</td>"
            str += "<td class='datecompleted'>" + data[index].datecompleted + "</td>"

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