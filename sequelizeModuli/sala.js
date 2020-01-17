const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Sala = sequelize.define("sala",{
    }, {
    	//neradi iako dokumentacija kaze da bi trebalo???
    	/*
    	name: {
	        singular: "sala",
	        plural: "sale"
	    }
	    */

	    freezeTableName: true,
  		tableName: 'sale'
    })
    return Sala;
};
