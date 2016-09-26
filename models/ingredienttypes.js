'use strict';
module.exports = function(sequelize, DataTypes) {
  var IngredientTypes = sequelize.define('IngredientTypes', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return IngredientTypes;
};