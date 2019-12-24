var express = require("express");
const url = require('url');
var fs = require("fs");

//html
var app = express();
app.get("/",function(req,res){
    res.sendFile(__dirname+"/pocetna.html");
})
app.get("/pocetna.html",function(req,res){
    app.use(express.static('/img'));
    res.sendFile(__dirname+"/pocetna.html");
})
app.get("/rezervacija.html",function(req,res){
    res.sendFile(__dirname+"/rezervacija.html");
})
app.get("/sale.html",function(req,res){
    res.sendFile(__dirname+"/sale.html");
})
app.get("/unos.html",function(req,res){
    res.sendFile(__dirname+"/unos.html");
})

//css
app.get("/buttons.css", function(req,res) {
    res.sendFile(__dirname+"/buttons.css");
})
app.get("/meni.css", function(req,res) {
    res.sendFile(__dirname+"/meni.css");
})
app.get("/pocetna.css", function(req,res) {
    res.sendFile(__dirname+"/pocetna.css");
}) 
app.get("/rezervacija.css", function(req,res) {
    res.sendFile(__dirname+"/rezervacija.css");
}) 
app.get("/sale.css", function(req,res) {
    res.sendFile(__dirname+"/sale.css");
}) 
app.get("/unos.css", function(req,res) {
    res.sendFile(__dirname+"/unos.css");
}) 

//js
app.get("/kalendar.js", function(req,res) {
    res.sendFile(__dirname+"/kalendar.js");
})
app.get("/pozivi.js", function(req,res) {
    res.sendFile(__dirname+"/pozivi.js");
})
app.get("/rezervacija.js", function(req,res) {
    res.sendFile(__dirname+"/rezervacija.js");
})

//pics
app.get("/google.png", function(req,res) {
    res.sendFile(__dirname+"/img/google.png");
})
app.get('\/[0-9]0?\.jpg', function(req,res) {
    res.sendFile(__dirname+"/img/"+req.url.substr(1));
})

//json
app.get("/zauzeca.json", function(req,res) {
    fs.readFile(__dirname+'/zauzeca.json', (err, data) => {
        if(err) {
          console.log(err);
          throw err;
        }
        var jsonObj = JSON.parse(data.toString());
        res.write(JSON.stringify(jsonObj));
        res.send();
    });
})

app.listen(8080);
