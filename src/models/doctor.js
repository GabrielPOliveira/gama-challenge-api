'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate({Speciality, Address}) {
      this.belongsTo(Speciality, {foreignKey: 'specialitiesId'});
      this.belongsTo(Address, {foreignKey: 'addressId'});
    }
    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  Doctor.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    register:{ 
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING
    },
    cellphone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'doctors',
    modelName: 'Doctor',
  });
  return Doctor;
};