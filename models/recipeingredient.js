'use strict';
module.exports = function(sequelize, DataTypes) {
  var RecipeIngredient = sequelize.define('RecipeIngredient', {
    measure: DataTypes.STRING,
    recipeId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RecipeIngredient;
};