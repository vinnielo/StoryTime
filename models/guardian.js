module.exports = function(sequelize, DataTypes) {
    var Guardian = sequelize.define("Guardian", {
        
        name: {
          type: DataTypes.STRING,
          allowNull: false
          
        }
      });
 return Guardian;
}

