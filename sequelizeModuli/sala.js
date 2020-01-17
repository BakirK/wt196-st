const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Sala = sequelize.define("sala",{
    	naziv: Sequelize.STRING,
    	zaduzenaOsoba:{
    		type:Sequelize.INTEGER(),
    		references: {
		      model: 'osoblje',
		      key: 'id'
		    },
		    unique: true,
		    //allowNull: false,
		    as:'ZaduzenaOsoba'
    	}
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
