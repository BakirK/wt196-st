var express = require("express");
const url = require('url');
var fs = require("fs");
var app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//html
app.get("/",function(req,res){
    //app.use(express.static('/img'));
    res.sendFile(__dirname+"/html/pocetna.html");
});
app.get("/pocetna.html",function(req,res){
    //app.use(express.static('/img'));
    res.sendFile(__dirname+"/html/pocetna.html");
});
app.get("/rezervacija.html",function(req,res){
    res.sendFile(__dirname+"/html/rezervacija.html");
});
app.get("/sale.html",function(req,res){
    res.sendFile(__dirname+"/html/sale.html");
});
app.get("/unos.html",function(req,res){
    res.sendFile(__dirname+"/html/unos.html");
});


//css
app.get("/buttons.css", function(req,res) {
    res.sendFile(__dirname+"/css/buttons.css");
});
app.get("/meni.css", function(req,res) {
    res.sendFile(__dirname+"/css/meni.css");
});
app.get("/pocetna.css", function(req,res) {
    res.sendFile(__dirname+"/css/pocetna.css");
});
app.get("/rezervacija.css", function(req,res) {
    res.sendFile(__dirname+"/css/rezervacija.css");
});
app.get("/sale.css", function(req,res) {
    res.sendFile(__dirname+"/css/sale.css");
});
app.get("/unos.css", function(req,res) {
    res.sendFile(__dirname+"/css/unos.css");
});

//js
app.get("/kalendar.js", function(req,res) {
    res.sendFile(__dirname+"/js/kalendar.js");
});
app.get("/pozivi.js", function(req,res) {
    res.sendFile(__dirname+"/js/pozivi.js");
});
app.get("/rezervacija.js", function(req,res) {
    res.sendFile(__dirname+"/js/rezervacija.js");
});
app.get("/pocetna.js", function(req,res) {
    res.sendFile(__dirname+"/js/pocetna.js");
});

//pics
app.get("/google.png", function(req,res) {
    res.sendFile(__dirname+"/img/google.png");
});
app.get('\/[0-9]0?\.jpg', function(req,res) {
    app.use(express.static('/img'+req.url.substr(1)));
    res.sendFile(__dirname+"/img/"+req.url.substr(1));
});

//json
app.get("/zauzeca.json", function(req,res) {
    fs.readFile(__dirname+'/zauzeca.json', (err, data) => {
        if(err) {
          console.log(err);
          throw err;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data.toString());
        res.send();
    });
});

//post
app.post("/json", function(req,res) {
    //console.log(req.body);
    fs.writeFile(__dirname+'/zauzeca.json', JSON.stringify(req.body), function(){
        console.log('Uspjesno dodano zauzece');
    });
});

//osoblje
app.get("/osoblje", function(req, res) {
    db.osoba.findAll({raw:true, attributes: ['ime', 'prezime', 'uloga']}).then(function(set) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(set));
        res.send();
    });
})

app.listen(8080);