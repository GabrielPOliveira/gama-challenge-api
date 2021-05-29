'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {

    static associate({ BloodType, Address }) {
      // define association here
      this.belongsTo(BloodType, {foreignKey: 'bloodtypesId'});
      this.belongsTo(Address, {foreignKey: 'addressId'});

    }
  };
  Client.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,      
    }, 
    cpf: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
     type:  DataTypes.STRING,
    },
    cellphone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'clients',
    modelName: 'Client',
  });
  return Client;
};