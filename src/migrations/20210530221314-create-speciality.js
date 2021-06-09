'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('specialities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING
      },
      code: {
        type: DataTypes.STRING
      },
      createdAt: {        
        type: DataTypes.DATE
      },
      updatedAt: {        
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('specialities');
  }
};