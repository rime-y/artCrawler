var express = require('express');
var app = express();

app.listen(3000, function(){
    console.log("my start")
})

app.get('/', function(req, res){
    res.send("<h1>hi friends!</h1>")
})