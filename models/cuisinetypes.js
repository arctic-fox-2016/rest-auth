'use strict';
module.exports = function(sequelize, DataTypes) {
  var CuisineTypes = sequelize.define('CuisineTypes', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CuisineTypes;
};