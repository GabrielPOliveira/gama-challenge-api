'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('appointmentStatus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status: {
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
    await queryInterface.dropTable('appointmentStatus');
  }
};