const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Rezervacija = sequelize.define("rezervacija",{
    	id: {
	        type: DataTypes.UUID,
	        primaryKey: true
	    },
    	termin:{
    		type: DataTypes.UUID,
    		unique: true,
    		references: {
	          model: 'termin',
	          key: 'id'
	       	}
    	},
    	sala:{
    		type: DataTypes.UUID,
    		allowNull: true,
    		defaultValue: null,
    		references: {
	          model: 'sala',
	          key: 'id'
	       	}
    	},
    	osoba:{
    		type: DataTypes.UUID,
    		allowNull: true,
    		defaultValue: null,
    		references: {
	          model: 'osoba',
	          key: 'id'
	       	}
    	}
    }, {
    	name: {
	        singular: "rezervacija",
	        plural: "rezervacije"
	    }
    })
    return Rezervacija;
};
