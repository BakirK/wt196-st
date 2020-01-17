const db = require('./db.js')
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});
function inicializacija(){
    var osobljeListaPromisea=[];
    var saleListaPromisea=[];
    var terminiListaPromisea=[];
    var rezervacijeListaPromisea=[];

    return new Promise(function(resolve,reject){
    osobljeListaPromisea.push(db.osoba.create({ime:'Neko', prezime:'Nekic', uloga:'profesor'}));
    osobljeListaPromisea.push(db.osoba.create({ime:'Drugi', prezime:'Neko', uloga:'asistent'}));
    osobljeListaPromisea.push(db.osoba.create({ime:'Test', prezime:'Test', uloga:'asistent'}));
    let beg = new Date(2020,1,1,12,0,0,0);
    let end = new Date(2020,1,1,13,0,0,0);
    let end2 = new Date(2020,1,1,14,0,0,0);
    terminiListaPromisea.push(db.termin.create({redovni: false, dan: null, 
                                datum: (new Date(2020,0,1)).toYMD(),  semestar: null,  pocetak: beg.toTime(), kraj: end.toTime()}));
    terminiListaPromisea.push(db.termin.create({redovni: true, dan: 0, 
                                datum: null,  semestar: 'zimski',  pocetak: end.toTime(), kraj: end2.toTime()}));

    Promise.all(osobljeListaPromisea).then(function(autori){
        var neko=autori.filter(function(a){return a.ime==='Neko'})[0];
        var drugi=autori.filter(function(a){return a.ime==='Drugi'})[0];
        var test=autori.filter(function(a){return a.ime==='Test'})[0];

        saleListaPromisea.push(
            db.sala.create({naziv:'1-11'}).then(function(s){
                s.setZaduzenaOsoba(neko.id);
                return new Promise(function(resolve,reject){resolve(s);});
            })
        );
        saleListaPromisea.push(
            db.sala.create({naziv:'1-15'}).then(function(s){
                s.setZaduzenaOsoba(drugi.id);
                return new Promise(function(resolve,reject){resolve(s);});
            })
        );

        Promise.all(saleListaPromisea).then(function(sale) {
            var prvaSala = sale.filter(function(a){return a.naziv==='1-11'})[0];
            //var drugaSala = sale.filter(function(a){return a.naziv==='1-15'})[0];

            Promise.all(terminiListaPromisea).then(function(termini) {
                var prviTermin = termini.filter(function(a){return !a.redovni})[0];
                var drugiTermin = termini.filter(function(a){return a.redovni})[0];
                //rezervacije
                rezervacijeListaPromisea.push(
                    db.rezervacija.create(
                        {termin: prviTermin.id, sala: prvaSala.id, osoba: neko.id}
                    )
                );

                rezervacijeListaPromisea.push(
                    db.rezervacija.create(
                        {termin: drugiTermin.id, sala: prvaSala.id, osoba: test.id}
                    )
                );

            }).catch(function(err){console.log("Termini greska "+err);});
        }).catch(function(err){console.log("Sale greska "+err);});
    }).catch(function(err){console.log("Osobe greska "+err);});   

    });
}


(function() {
    Date.prototype.toYMD = Date_toYMD;
    function Date_toYMD() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
    Date.prototype.toTime = Date_toTime;
    function Date_toTime() {
        var h, m, s;
        h = String(this.getHours());
        if (h.length == 1) {
            h = "0" + h;
        }
        m = String(this.getMinutes());
        if (m.length == 1) {
            m = "0" + m;
        }
        s= String(this.getSeconds());
        if (s.length == 1) {
            s = "0" + s;
        }
        return h + ":" + m + ":" + s;
    }
})();