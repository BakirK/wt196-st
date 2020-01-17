const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Osoba = sequelize.define("osoba",{
        ime:Sequelize.STRING,
        prezime:Sequelize.STRING,
        uloga:Sequelize.STRING
    }, {
    	name: {
	        singular: "osoba",
	        plural: "osoblje"
	    }
    })
    return Osoba;
};
