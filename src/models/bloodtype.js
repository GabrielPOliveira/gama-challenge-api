'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodType extends Model {
  
    static associate({Client}) {
      // define association here
      this.hasOne(Client, {foreignKey: 'bloodtypesId'})
    }
  };
  BloodType.init({
    type: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'bloodtypes',
    modelName: 'BloodType',
  });
  return BloodType;
};