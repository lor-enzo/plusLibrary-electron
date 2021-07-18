const fs = require('fs');
const storage = require('electron-json-storage');
const {dialog} = require ('electron');

function SMstartup(){
    // 1. locate where storage is
    console.log(storage.getDefaultDataPath());

    // search for data file
    console.log("PROFILE CHECK");
    var check = false;
    
    storage.getSync("profile",function(error, data)
    {
        if (error)
        {
            throw error;
        }
        
        // check if the get object is empty.
        check = Object.keys(data).length === 0;

        console.log(data);
    });

    console.log(check)
    // if there's an error with getting the file (?)
    if (!check){
        
        console.log("MAKING NEW PROFILE");
        console.log(__dirname + '/templates/userdata.json')

        let json = JSON.parse(fs.readFileSync(__dirname + '/templates/userdata.json', 'utf-8'));
        console.log(json);

        storage.set('profile', json, 
        {
            prettyPrinting : true
        }, function(error) {
            if (error) throw error;
        });
    }
    else {
        console.log("check pass")
    }

    // second check -- for userid and apikey
    // var check2 = JSON.parse(storage.get('profile', function(error, data){
    //     if (error) throw error;

    //     console.log(data);
    // }));
    
    // console.log(check2);
}

function SMtest(){

    storage.get('profile', function(error, data){
        if (error) throw error;

        console.log(data['profile']['steam']['steamid']);
        console.log(data);

        console.log("changing value of 'steamid' now");

        let x = Math.random();

        console.log(x);

        // warning: set overwrites the whole object with what is set
        storage.set('profile', {'steamid' : JSON.stringify(x)}, 
        {
            prettyPrinting : true
        }
        , function (error,data)
    {
        if (error)
            throw error;

    })
    })
}
document.getElementById("storagemanagement").addEventListener("click", SMstartup);
document.getElementById("storagemanagement2").addEventListener("click", SMtest);