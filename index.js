const express = require("express");
const bodyParser = require("body-parser");
const api = express();

api.use(express.static(__dirname));
api.use(bodyParser.json());

api.listen(3000, () =>{
    console.log("api up");
});

api.post('/shortenUrl',(req,res) => {
    console.log("post recieved");
    console.log(req.body);
    console.log(req.body.link);
    const link = req.body.link;

    if (!validURL(link)||link === "") {
        res.send(JSON.stringify({shortendLink:link,status:"Failed"}))

    } else {
        const shortenUrl = makeShortendUrl(10);
        res.send(JSON.stringify({shortendLink:shortenUrl,status:"Succeded"}))
    }

});

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
}

function makeShortendUrl(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }