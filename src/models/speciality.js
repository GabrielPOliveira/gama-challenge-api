'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Speciality extends Model {

    static associate({ Doctor }) {
      this.hasOne(Doctor, {foreignKey: "specialitiesId"});
    }
  };
  Speciality.init({
    description: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'specialities',
    modelName: 'Speciality',
  });
  return Speciality;
};