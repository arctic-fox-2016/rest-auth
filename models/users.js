'use strict';

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};
