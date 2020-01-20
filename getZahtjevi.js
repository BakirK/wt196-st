var getZahtjevi = function() {

    var getZauzecaImpl = function(db, callback) {
        //const db = require('./db.js');
        var redovna = [], vanredna = [], sva = {};
        db.rezervacija.findAll({
            raw:true, 
            attributes: [], 
            include: [
                {
                    model: db.termin,
                    as:'TerminRez', 
                    where:{redovni:1}, 
                    attributes: [
                        'dan', 'pocetak', 'kraj', 'semestar'
                    ]
                }, 
                {
                    model: db.sala, 
                    as:'RezervacijaSala',
                    attributes: ['naziv']
                }, 
                {
                    model:db.osoba, 
                    as:'RezervacijaOsobe',
                    attributes: [
                        //db.osoba.sequelize.literal("ime || ' ' || prezime"), 'predavac' 
                        'ime', 'prezime'        
                    ]
                }
            ]
        }).then(function(resultSet) {
            redovna = resultSet;
            db.rezervacija.findAll({
            raw:true, 
            attributes: [], 
            include: [
                {
                    model: db.termin,
                    as:'TerminRez', 
                    where:{redovni:0}, 
                    attributes: [
                        'datum', 'pocetak', 'kraj'
                    ]
                }, 
                {
                    model: db.sala, 
                    as:'RezervacijaSala',
                    attributes: ['naziv']
                }, 
                {
                    model:db.osoba, 
                    as:'RezervacijaOsobe',
                    attributes: [
                        //db.osoba.sequelize.literal("ime || ' ' || prezime"), 'predavac' 
                        'ime', 'prezime', 'uloga'        
                    ]
                }
            ]
            }).then(function(resultSet) {
                vanredna = resultSet;
                sva.redovna = redovna;
                sva.vanredna = vanredna;
                let str = JSON.stringify(sva);
                str = str.replace(new RegExp('TerminRez.', 'g'), '').replace(new RegExp('RezervacijaOsobe.', 'g'), '').replace(new RegExp('RezervacijaSala.', 'g'),'');
                callback(str);
            });
        });

        
    }

    var provjeriZauzecaImpl = function(redovna, vanredna, obj, callback) {
        dat = new Date(obj.datum);
        var dan = ((dat.getDay() + 6) % 7);
        var currentMonth = dat.getMonth();
        var currentYear = dat.getYear() + 1900;
        var vrijemePocetak = obj.pocetak;
        var vrijemeKraj = obj.kraj;
        var redniDan = obj.dan;
        var trenutnaSala = obj.naziv;
        for (var i = redovna.length - 1; i >= 0; i--) {
                let semestar = Semestar(currentMonth);
                let t1 = redniDan == redovna[i]['dan'];
                let t2 = trenutnaSala == redovna[i]['naziv'] ;
                let t3 = semestar == redovna[i]['semestar'].toLowerCase();
                let t4 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, redovna[i]['pocetak'], redovna[i]['kraj']);
                if(t1 && t2 && t3 && t4) {
                    callback( "Nije moguće rezervisati salu " + trenutnaSala + 
                            " za navedeni datum " + dan + '/' + (currentMonth+1) + 
                            '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"! Salu je zauzeo " + 
                             redovna[i]['uloga'] + " " + redovna[i]['ime'] + 
                             " " + redovna[i]['prezime'] + ".");
                }
            }

            for (var i = vanredna.length - 1; i >= 0; i--) {
                let t1 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, vanredna[i]['pocetak'], vanredna[i]['kraj']);
                let parametri = vanredna[i]['datum'].split(".");
                let dat = new Date(+parametri[2], parametri[1] - 1, +parametri[0]);
                let dan3 = ((dat.getDay() + 6) % 7);
                if(obj.redovni) {
                    var t2 = redniDan == dan3;
                } else {
                    var t2 = dan == dat.getDate();
                }
                let t3 = trenutnaSala == vanredna[i]['naziv'];
                if(t1 && t2  && t3) {
                    callback("Nije moguće rezervisati salu " + trenutnaSala + 
                            " za navedeni datum " + dan + '/' + (currentMonth+1) + 
                            '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"! Salu je zauzeo " + 
                             vanredna[i]['uloga'] + " " + vanredna[i]['ime'] + 
                             " " + vanredna[i]['prezime'] + ".");
                }
            }
            callback(1);
    }

    function poklapanjeVremenaImpl(v1, v2, v3, v4) {
        let date1Pocetak = parseInt(v1);
        let date1Kraj = parseInt(v2);
        let date2Pocetak = parseInt(v3);
        let date2Kraj = parseInt(v4);
        if(date1Pocetak > date2Pocetak && date1Pocetak < date2Kraj) return true;
        if(date1Kraj > date2Pocetak && date1Kraj < date2Kraj) return true;
        if(date2Pocetak > date1Pocetak && date2Pocetak < date1Kraj) return true;
        if(date2Kraj > date1Pocetak && date2Kraj < date1Kraj) return true;
        if(date1Pocetak == date2Pocetak) return true;
        if(date1Kraj == date2Kraj) return true;
        return false;
    }

    function Semestar(month) {
        if ((month >= 9 && month <= 11) || month == 0) return "zimski";
        if(month >= 1 && month <= 5) return "ljetni";
        return "";
    }

    return {
        getZauzeca : getZauzecaImpl,
        provjeriZauzeca : provjeriZauzecaImpl
    }
}();

module.exports = getZahtjevi;