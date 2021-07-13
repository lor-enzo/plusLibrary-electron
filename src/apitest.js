
function apiTest2()
{
    var req = new XMLHttpRequest();
    req.open("GET", "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9C2F8B579B777036AD7B17C6A5BEC8FA&steamid=76561198133758253");
    req.send();
    document.getElementById("target").innerHTML = req.responseText;
    console.log(req.responseText);
}


function alertTest()
{
    alert("this is alertTest()");
}

document.getElementById("test").addEventListener("click", function(){
    apiTest2();
});
document.getElementById("alerter").addEventListener("click", function()
{
    alertTest();
});