const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Rezervacija = sequelize.define("rezervacija",{
    	termin:{
    		type:Sequelize.INTEGER(),
    		references: {
		      model: 'termins',
		      key: 'id'
		    },
		    unique: true,
		    allowNull: false
    	}
    }, {
    	name: {
	        singular: "rezervacija",
	        plural: "rezervacije"
	    }
    });
    return Rezervacija;
};
