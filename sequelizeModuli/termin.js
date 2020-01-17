const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Termin = sequelize.define("termin",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        redovni:Sequelize.BOOLEAN,
        dan:Sequelize.INTEGER,
        datum:Sequelize.STRING,
        semestar:Sequelize.STRING,
        pocetak:Sequelize.TIME,
        kraj:Sequelize.TIME

    }, {
    	name: {
	        singular: "termin",
	        plural: "termini"
	    }
    })
    return Termin;
};
