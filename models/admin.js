'use strict';
module.exports = function(sequelize, DataTypes) {
  var admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return admin;
};