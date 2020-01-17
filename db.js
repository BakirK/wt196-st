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

//ovo ne radi jer ne postavi unique constraint iz nekog razloga pa sam rucno postavio fk sa unique constraitom u rezervacija.js
//dok ovaj kod samo generise metode get i set
db.rezervacija.belongsTo(db.termin, {foreignKey:'termin',targetKey:'id', as:'TerminRez'});

//ista stvar - ne postavlja unique pa sam rucno napravio referencu u sala.js
db.sala.belongsTo(db.osoba, {foreignKey:'zaduzenaOsoba',targetKey:'id', as:'ZaduzenaOsoba'});

//veze
db.sala.hasMany(db.rezervacija, {foreignKey:'sala',targetKey:'id', as:'RezervacijaSala'});
db.osoba.hasMany(db.rezervacija, {foreignKey:'osoba',targetKey:'id', as:'RezervacijaOsobe'});

module.exports=db;