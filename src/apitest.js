document.getElementById("test").addEventListener("click", function(){
    var req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9C2F8B579B777036AD7B17C6A5BEC8FA&steamid=76561198133758253");
    req.responseType = 'json';
   
    req.onload = function(e) {
        if (this.status == 200)
        {
            console.log('response', this.response);
            document.getElementById("target").innerHTML = "TARGET\n" + JSON.stringify(this.response);
        }
    }
    
    req.send();
});

document.getElementById("alerter").addEventListener("click", function(){
    alert("this is alertTest()");
});