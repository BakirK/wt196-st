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

    return new Promise(function(resolve,reject){
    osobljeListaPromisea.push(db.osoba.create({ime:'Neko', prezime:'Nekic', uloga:'profesor'}));
    osobljeListaPromisea.push(db.osoba.create({ime:'Drugi', prezime:'Neko', uloga:'asistent'}));
    osobljeListaPromisea.push(db.osoba.create({ime:'Test', prezime:'Test', uloga:'asistent'}));

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
        /*knjigeListaPromisea.push(
            db.knjiga.create({naziv:'Zajednicka knjiga',broj:0}).then(function(k){
                k.setAutori([andric,dizdar]);
                return new Promise(function(resolve,reject){resolve(k);});
            })
        );*/
        /*Promise.all(knjigeListaPromisea).then(function(knjige){
            var pavlija=knjige.filter(function(k){return k.naziv==='Prokleta avlija'})[0];
            var thronika=knjige.filter(function(k){return k.naziv==='Travnicka hronika'})[0];
            var kspavac=knjige.filter(function(k){return k.naziv==='Kameni spavac'})[0];
            var zknjiga=knjige.filter(function(k){return k.naziv==='Zajednicka knjiga'})[0];
            bibliotekeListaPromisea.push(
                db.biblioteka.create({adresa:'Titova 1'}).then(function(b){
                    return b.setKnjigeBiblioteke([pavlija,thronika]).then(function(){
                    return new Promise(function(resolve,reject){resolve(b);});
                    });
                })
            );
            bibliotekeListaPromisea.push(
                db.biblioteka.create({adresa:'Zmaja od Bosne bb'}).then(function(b){
                    return b.setKnjigeBiblioteke([kspavac,zknjiga]).then(function(){
                    return new Promise(function(resolve,reject){resolve(b);});
                    });
                })
            );
            Promise.all(bibliotekeListaPromisea).then(function(b){resolve(b);}).catch(function(err){console.log("Biblioteke greska "+err);});
        }).catch(function(err){console.log("Knjige greska "+err);});*/
    }).catch(function(err){console.log("Osobe greska "+err);});   

    });
}
