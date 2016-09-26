'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      direction: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.STRING
      },
      timeprep: {
        type: Sequelize.INTEGER
      },
      timecook: {
        type: Sequelize.INTEGER
      },
      serving: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.STRING
      },
      cuisineTypeId: {
      	type: Sequelize.INTEGER
      },
      mealTypeId: {
      	type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Recipes');
  }
};
