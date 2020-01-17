const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Sala = sequelize.define("sala",{
    	id: {
	        type: DataTypes.UUID,
	        primaryKey: true
	    },
        naziv:Sequelize.STRING,
        zaduzenaOsoba:{
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
	        singular: "sala",
	        plural: "sale"
	    }
    })
    return Sala;
};
