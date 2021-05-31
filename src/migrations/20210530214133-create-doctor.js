'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID
      },
      name: {
        type: DataTypes.STRING
      },
      register: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      cellphone: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      specialitiesId: {
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
    await queryInterface.dropTable('doctors');
  }
};