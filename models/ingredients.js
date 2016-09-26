'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define('Ingredients', {
    name: DataTypes.STRING,
    isSelected: DataTypes.BOOLEAN,
    ingredientTypeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ingredients;
};