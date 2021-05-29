'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('bloodtypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },     
      type: {
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
    await queryInterface.dropTable('bloodtypes');
  }
};