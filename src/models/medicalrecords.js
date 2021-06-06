'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecords extends Model {
 
    static associate({Client, MedicalHistory}) {
      this.hasOne(Client, {foreignKey: 'medicalRecordsId'});
      this.hasMany(MedicalHistory, {foreignKey: 'medicalRecordsId'});
    }
    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  MedicalRecords.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    opening_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'medicalRecords',
    modelName: 'MedicalRecords',
  });
  return MedicalRecords;
};