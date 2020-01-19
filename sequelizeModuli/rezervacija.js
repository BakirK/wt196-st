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
    	},
        sala:{
            type:Sequelize.INTEGER(),
            references: {
              model: 'sale',
              key: 'id'
            },
            //allowNull: false,
            as:'RezervacijaSala'
        },
        osoba:{
            type:Sequelize.INTEGER(),
            references: {
              model: 'osoblje',
              key: 'id'
            },
            //allowNull: false,
            as:'RezervacijaOsobe'
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
