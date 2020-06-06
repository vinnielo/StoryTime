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
          }, 
        guardian: {
          type: DataTypes.STRING,
            allowNull: true
        },
        guardian1: {
          type: DataTypes.STRING,
            allowNull: true
        },
        toy: {
          type: DataTypes.STRING,
            allowNull: true
        }


      });

      // Kid.associate = function(models){
      //   Kid.belongsTo(models.User, {
      //     foreignKey: {
      //       allowNull:false
      //     }
      //   })
      // }
 return Kid

};

