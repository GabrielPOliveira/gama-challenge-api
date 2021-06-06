'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID
      },
      scheduling_date: {
        type: DataTypes.DATE
      },
      appointment_date: {
        type: DataTypes.DATE
      },
      value: {
        type: DataTypes.FLOAT(10,2)
      },
      appointments_statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctorsId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('appointments');
  }
};