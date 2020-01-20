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
        });

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
                        'ime', 'prezime'        
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
    }

    return {
        getZauzeca: getZauzecaImpl
    }
}();

module.exports = getZahtjevi;