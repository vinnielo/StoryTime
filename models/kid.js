module.exports = function(sequelize, DataTypes) {
    var Kid = sequelize.define("Kid", {
        
        name: {
          type: DataTypes.STRING,
          allowNull: false
          
        },
      
        pet: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sibling: {
            type: DataTypes.STRING,
            allowNull: true
          }
      });
 return Kid

};

