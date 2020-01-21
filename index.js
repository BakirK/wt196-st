var express = require("express");
const url = require('url');
var fs = require("fs");
var app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');
const getZahtjevi = require('./getZahtjevi.js');
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
app.get("/osobe.html",function(req,res){
    res.sendFile(__dirname+"/html/osobe.html");
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
app.get("/osobe.css", function(req,res) {
    res.sendFile(__dirname+"/css/osobe.css");
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
app.get("/osobe.js", function(req,res) {
    res.sendFile(__dirname+"/js/osobe.js");
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
    /*fs.readFile(__dirname+'/zauzeca.json', (err, data) => {
        if(err) {
          console.log(err);
          throw err;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data.toString());
        res.send();
    });*/
    res.writeHead(200, {'Content-Type': 'application/json'});
    getZahtjevi.getZauzeca(db, function(str) {
      res.end(str);
    });

});

//post
app.post("/json", function(req,res) {
    //console.log(req.body);
    /*fs.writeFile(__dirname+'/zauzeca.json', JSON.stringify(req.body), function(){
        console.log('Uspjesno dodano zauzece');
    });*/
    const obj = req.body;
    var zauzeca;
    getZahtjevi.getZauzeca(db, function(data) {
        jsonObj = JSON.parse(data);
        redovna = jsonObj['redovna'];
        vanredna = jsonObj['vanredna'];
        getZahtjevi.provjeriZauzeca(redovna, vanredna, obj, function(data) {
            if(data===1) {
                //nije zauzeto
                if(obj.redovni) {
                    var datum = null;
                    var semestar = obj.semestar;
                    var dan = obj.dan;
                } else {
                    var datum = obj.datum;
                    var semestar = null;
                    var dan = null;
                }
                db.osoba.findOne(
                    {
                        where:{
                            ime:obj.ime, 
                            prezime:obj.prezime, 
                            uloga:obj.uloga
                        }
                    }
                ).then(function(osoba){
                    if(osoba != null) {
                        db.sala.findOne(
                            {   
                                where:{
                                    naziv: obj.naziv
                                }
                            }
                        ).then(function(sala) {
                            if(sala != null) {
                                db.termin.create(
                                    {
                                        redovni : obj.redovni,
                                        dan : dan,
                                        datum : datum,
                                        semestar : semestar,
                                        pocetak : obj.pocetak,
                                        kraj : obj.kraj
                                    }
                                ).then(function(termin) {
                                    db.rezervacija.create(
                                        {
                                            termin: termin.id,
                                            sala: sala.id,
                                            osoba : osoba.id
                                        }   
                                    ).then(function(rezerv){
                                        res.writeHead(200, {'Content-Type': 'application/json'});
                                        getZahtjevi.getZauzeca(db, function(str) {
                                            res.end(str);
                                            res.send;
                                        });
                                    })
                                })
                            } else {
                                //nije pronadjena sala
                                res.status(400).send('Osoba ili sala nije pronadjena');
                            }
                        });
                    } else {
                        //nije pronadjena osoba
                        res.status(400).send('Osoba ili sala nije pronadjena');
                    }    
                });
            }
             else {
                //jeste zauzeto
                res.writeHead(409, {'Content-Type': 'text/html'});
                res.end(data);
             }
        });
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

app.get("/mjestoOsoblja", function(req, res) {
    getZahtjevi.getMjestaOsoblja(db, function(str) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(str));
        res.send();
    });
})

app.get("/sale", function(req, res) {
    db.sala.findAll({raw:true, attributes: ['naziv']}).then(function(set) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(set));
        res.send();
    });
})

app.listen(8080);