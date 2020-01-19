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


//veze
db.rezervacija.belongsTo(db.termin, {foreignKey:'termin', targetKey:'id', as:'TerminRez'});
db.termin.hasOne(db.rezervacija, {foreignKey:'termin', sourceKey:'id', as:'TerminRez'});

db.sala.belongsTo(db.osoba, {foreignKey:'zaduzenaOsoba', targetKey:'id', as:'ZaduzenaOsoba'});
db.osoba.hasOne(db.sala, {foreignKey:'zaduzenaOsoba', sourceKey:'id', as:'ZaduzenaOsoba'});

db.sala.hasMany(db.rezervacija, {foreignKey:'sala', targetKey:'id', as:'RezervacijaSala'});
db.rezervacija.belongsTo(db.sala, {foreignKey:'sala', sourceKey:'id', as:'RezervacijaSala'});


db.osoba.hasMany(db.rezervacija, {foreignKey:'osoba', targetKey:'id', as:'RezervacijaOsobe'});
db.rezervacija.belongsTo(db.osoba, {foreignKey:'osoba', sourceKey:'id', as:'RezervacijaOsobe'});

module.exports=db;