const db = require('electron-db');
//const fs = require('fs');

function DPtest1() {

    console.log("DPtest1")
    // pull stuff from api

    let req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9C2F8B579B777036AD7B17C6A5BEC8FA&steamid=76561198133758253&include_appinfo=1&include_played_free_games=1&include_free_sub=0&skip_unvetted_apps=0");
    req.responseType = 'json';

    // write API data to an object

    req.onload = function (e) {
        if (this.status == 200) {
            console.log('200 response for datapull');

            // do a little processing so that we have a more direct way to compare
            // compare with database

            let games = this.response['response']['games'];
            let gamecount = this.response['response']['game_count']
            console.log(games);
            console.log(typeof (games));
            console.log(gamecount);

            // database check
            if (!db.valid('games')) {
                console.log('error, no db');
                return;
            }

            for (let index in games) {
                // console.log(index);
                // console.log(typeof (games[index]));
                // console.log(games[index])
                // console.log(games[index].appid);

                db.getRows('games', { appid: games[index].appid }
                    , (success, result) => {
                        //console.log(success);
                        // console.log(Array.isArray(result))
                        // console.log(result.length)
                        // console.log(Array.isArray(result) && result.length)

                        if (success) {
                            // if in db, overwrite values.
                            // console.log(success)
                            if (result.length > 0) {
                                // there is an entry
                                // console.log("entry exists");
                                // overwrite values
                                console.log("doing overwrite")
                                // console.log(games[index].appid)
                                console.log(result)
                                console.log (typeof (result))
                                let overwrittenobject = updatevalues(games[index], result[0]);
                                let where = {
                                    'appid': games[index]['appid']
                                }
                                db.updateRow('games', where, overwrittenobject, (succ, msg) => {
                                    console.log("OVERWRITEsuccess: " + succ + ", message: " + msg);

                                })


                            }
                            else {
                                // if game is not in db, make a new game object from template
                                console.log(success)
                                // make a new object by loading json file
                                let json = JSON.parse(fs.readFileSync(__dirname + '/templates/steamgame.json', 'utf-8'));
                                console.log(json)
                                console.log(typeof(json))
                                db.insertTableContent('games', updatevalues(games[index], json), (succ, msg) => {
                                    console.log("success: " + succ + ", message: " + msg);
                                });
                            }
                        }
                        else {
                            // error handling(?)
                        }
                    })

                // console.log('to the next appid in response')
            }
        }
        else {
            console.log('error, ' + e);
            // error handling(?)
        }
    }
    req.send();
}

function updatevalues(request, object) {
    // basically, tie the numbers to the
    console.log(object)
    console.log(object.playtime)
    console.log(typeof(object.playtime))
    
    object.appid = request['appid']
    object.name = request['name']
    object.playtime.total = request.playtime_forever
    object.playtime.totalwindows = request.playtime_windows_forever
    object.playtime.totalmac = request.playtime_mac_forever
    object.playtime.totallinux = request.playtime_linux_forever

    object.playtime['2weeks'] = request.hasOwnProperty('playtime_2weeks') ? request.playtime_2weeks : '-';

    object['isinlibrary'] = true

    return object;
}
document.getElementById("datapulling").addEventListener("click", DPtest1);