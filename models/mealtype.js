'use strict';
module.exports = function(sequelize, DataTypes) {
  var MealType = sequelize.define('MealType', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MealType;
};