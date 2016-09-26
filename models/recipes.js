'use strict';
module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define('Recipes', {
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    direction: DataTypes.TEXT,
    level: DataTypes.STRING,
    cuisineTypeId: DataTypes.INTEGER,
    mealTypeId: DataTypes.INTEGER,
    timeprep: DataTypes.INTEGER,
    timecook: DataTypes.INTEGER,
    serving: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Recipes;
};