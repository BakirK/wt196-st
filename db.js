const Sequelize = require("sequelize");
const sequelize = new Sequelize("DBWT19","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.osoba = sequelize.import(__dirname+'/sequelizeModuli/osoblje.js');
db.rezervacija = sequelize.import(__dirname+'/sequelizeModuli/rezervacija.js');
db.termin = sequelize.import(__dirname+'/sequelizeModuli/termin.js');
db.sala = sequelize.import(__dirname+'/sequelizeModuli/sala.js');

//relacije
// Veza 1-n vise knjiga se moze nalaziti u biblioteci
/*
db.osoba.hasMany(db.rezervacija,{as:'RezervacijaOsobe'});
db.rezervacija.hasOne(db.termin,{as:'RezervacijaTermin'});
db.rezervacija.hasMany(db.sala,{as:'RezervacijaSala'});
db.sala.hasOne(db.osoba,{as:'ZaduzenaOsoba'});*/

// Veza n-m autor moze imati vise knjiga, a knjiga vise autora
//db.autorKnjiga=db.knjiga.belongsToMany(db.autor,{as:'autori',through:'autor_knjiga',foreignKey:'knjigaId'});
//db.autor.belongsToMany(db.knjiga,{as:'knjige',through:'autor_knjiga',foreignKey:'autorId'});


module.exports=db;