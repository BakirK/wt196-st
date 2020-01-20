var getZahtjevi = function() {
    var getMjestaOsobljaImpl = function(db, callback) {
        db.rezervacija.findAll({
            raw:true, 
            attributes: [], 
            include: [
                {
                    model: db.termin,
                    as:'TerminRez', 
                    attributes: [
                        'pocetak', 'kraj', 'dan', 'datum'
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
                        'ime', 'prezime', 'uloga'       
                    ]
                }
            ]
        }).then(function(set) {
            set.forEach(function(obj) {
                var datum = new Date();
                var datumString = datum.toDMY();
                let time1 = JSON.stringify(obj['TerminRez.pocetak']).replace(/\"/g, "");
                let time2 = JSON.stringify(obj['TerminRez.kraj']).replace(/\"/g, "");
                let pocetniDatum = Date.parse('01/01/2011 ' + time1);
                let krajnjiDatum = Date.parse('01/01/2011 ' + time2); 
                if(obj.datum !== null) {
                    var istiDatum = ((datum.getDay() + 6)%7) == obj.dan;
                } else {
                    var istiDatumISemestar = (datumString == obj.datum) 
                                            && (Semestar(+datum.getMonth()) == obj.semestar);
                }
                datum = Date.parse('01/01/2011 ' + datum.getHours()+":"+datum.getMinutes()+":"+datum.getSeconds());

                if(!(datum>=pocetniDatum && datum<=krajnjiDatum) && !istiDatumISemestar) {
                    obj.naziv = "kancelarija";
                }
                
            });
            callback(set);
        })
    }
    var getZauzecaImpl = function(db, callback) {
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
                        'ime', 'prezime', 'uloga'       
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
        let parametri = JSON.stringify(obj.datum).replace(/\"/g, "").split(".");
        let dat = new Date();
                
        let y = +parametri[2];
        dat.setFullYear(y);

        let month = parametri[1]-1;
        dat.setMonth(month);

        let day = +parametri[0];
        dat.setDate(day);
        

        var dan = dat.getDate();
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
                    return 0;
                }
            }

            for (var i = vanredna.length - 1; i >= 0; i--) {
                let t1 = poklapanjeVremenaImpl(vrijemePocetak, vrijemeKraj, vanredna[i]['pocetak'], vanredna[i]['kraj']);
                let parametri2 = vanredna[i]['datum'].split(".");
                let d = new Date(dat);

                let y = +parametri2[2];
                d.setFullYear(y);

                let month = parametri2[1]-1;
                d.setMonth(month);

                let day = +parametri2[0];
                d.setDate(day);

                let dan3 = ((d.getDay() + 6) % 7);

                if(obj.redovni) {
                    var t2 = redniDan == dan3;
                } else {
                    var t2 = dat.valueOf() == d.valueOf();
                }
                let t3 = trenutnaSala == vanredna[i]['naziv'];
                if(t1 && t2  && t3) {
                    callback("Nije moguće rezervisati salu " + trenutnaSala + 
                            " za navedeni datum " + dan + '/' + (currentMonth+1) + 
                            '/' + currentYear + " i termin od " +
                             vrijemePocetak + " do "+ vrijemeKraj +"! Salu je zauzeo " + 
                             vanredna[i]['uloga'] + " " + vanredna[i]['ime'] + 
                             " " + vanredna[i]['prezime'] + ".");
                    return 0;
                } 
            }
            callback(1);
    }

    function poklapanjeVremenaImpl(v1, v2, v3, v4) {
        var v1param = v1.split(":");
        var date1Pocetak = new Date(2020,0,1,+v1param[0],+v1param[1]).valueOf();

        var v2param = v2.split(":");
        var date1Kraj = new Date(2020,0,1,+v2param[0],+v2param[1].valueOf());

        var v3param = v3.split(":");
        var date2Pocetak = new Date(2020,0,1,+v3param[0],+v3param[1]).valueOf();

        var v4param = v4.split(":");
        var date2Kraj = new Date(2020,0,1,+v4param[0],+v4param[1]).valueOf();
        /*let date1Pocetak = parseInt(v1);
        let date1Kraj = parseInt(v2);
        let date2Pocetak = parseInt(v3);
        let date2Kraj = parseInt(v4);*/
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
        return "medjusemestar";
    }

    function poklapajuSeDatumi(date1Pocetak, date1Kraj, date2Pocetak, date2Kraj) {
        if(date1Pocetak > date2Pocetak && date1Pocetak < date2Kraj) return true;
        if(date1Kraj > date2Pocetak && date1Kraj < date2Kraj) return true;
        if(date2Pocetak > date1Pocetak && date2Pocetak < date1Kraj) return true;
        if(date2Kraj > date1Pocetak && date2Kraj < date1Kraj) return true;
        if(date1Pocetak == date2Pocetak) return true;
        if(date1Kraj == date2Kraj) return true;
        return false;
    }

    Date.prototype.toDMY = Date_toDMY;
    function Date_toDMY() {
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
        return day + "." + month + "." + year;
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

    return {
        getZauzeca : getZauzecaImpl,
        provjeriZauzeca : provjeriZauzecaImpl,
        getMjestaOsoblja : getMjestaOsobljaImpl
    }
}();

module.exports = getZahtjevi;