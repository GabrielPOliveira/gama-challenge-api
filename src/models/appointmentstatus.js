'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentStatus extends Model {

    static associate({Appointment}) {
      this.hasOne(Appointment, {foreignKey: 'appointments_statusId'})      
    }
  };
  AppointmentStatus.init({
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'appointmentStatus',
    modelName: 'AppointmentStatus',
  });
  return AppointmentStatus;
};