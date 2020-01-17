const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Rezervacija = sequelize.define("rezervacija",{
    	termin:{
    		type:Sequelize.INTEGER(),
    		references: {
		      model: 'termini',
		      key: 'id'
		    },
		    unique: true,
		    //allowNull: false,
            as:'TerminRez'
    	}
    }, {
        /*
    	name: {
	        singular: "rezervacija",
	        plural: "rezervacije"
	    }
        */

        freezeTableName: true,
        tableName: 'rezervacije'
    });
    return Rezervacija;
};
