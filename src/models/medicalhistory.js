'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalHistory extends Model {
 
    static associate({MedicalRecords, Doctor}) {
      this.belongsTo(MedicalRecords, {foreignKey: 'medicalRecordsId'});
      this.belongsTo(Doctor, {foreignKey: 'doctorsId'});
    }
    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  MedicalHistory.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.TEXT
    },
    medicalRecordsId: {
      type: DataTypes.INTEGER
    },
    doctorsId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    tableName: 'medicalHistories',
    modelName: 'MedicalHistory',
  });
  return MedicalHistory;
};