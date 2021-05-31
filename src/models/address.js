'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {

    static associate({Client, Doctor}) {
      // define association here
      this.hasOne(Client, {foreignKey: "addressId"})
      this.hasOne(Doctor, {foreignKey: "addressId"})

    }
    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  Address.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    complement: {
      type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'address',
    modelName: 'Address',
  });
  return Address;
};