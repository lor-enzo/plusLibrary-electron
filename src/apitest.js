document.getElementById("test").addEventListener("click", function(){
    let req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9C2F8B579B777036AD7B17C6A5BEC8FA&steamid=76561198133758253&include_appinfo=1&include_played_free_games=1&include_free_sub=0&skip_unvetted_apps=0");
    req.responseType = 'json';
   
    req.onload = function(e) {
        if (this.status == 200)
        {
            console.log('response', this.response);
            let games = this.response['response']['games'];

            document.getElementById("target").innerHTML =JSON.stringify(games, null, '\n');
        }
    }
    
    req.send();
});

document.getElementById("alerter").addEventListener("click", function(){
    alert("this is alertTest()");
});