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

//ovo ne radi jer ne postavi unique constraint iz nekog razloga pa sam rucno postavio fk sa unique constraitom
//db.rezervacija.belongsTo(db.termin, {foreignKey:'termin',targetKey:'id', as:'TerminRez', unique: true, allowNull: false});

//veze
db.sala.hasMany(db.rezervacija, {foreignKey:'sala',targetKey:'id', as:'RezervacijaSala'});
db.osoba.hasMany(db.rezervacija, {foreignKey:'osoba',targetKey:'id', as:'RezervacijaOsobe'});
db.sala.belongsTo(db.osoba, {foreignKey:'zaduzenaOsoba',targetKey:'id', as:'ZaduzenaOsoba'});

module.exports=db;