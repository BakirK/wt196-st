const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Sala = sequelize.define("sala",{
    }, {
    	name: {
	        singular: "sala",
	        plural: "sale"
	    }
    })
    return Sala;
};
