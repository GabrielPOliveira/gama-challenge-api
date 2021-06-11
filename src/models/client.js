'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {

    static associate({ BloodType, Address, Appointment, MedicalRecords }) {
      // define association here
      this.belongsTo(BloodType, {foreignKey: 'bloodtypesId'});
      this.belongsTo(Address, {foreignKey: 'addressId'});
      this.belongsTo(MedicalRecords, {foreignKey: 'medicalRecordsId'});
      this.hasMany(Appointment, {foreignKey: 'clientsId'});
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