'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {

    static associate({AppointmentStatus, Doctor, Client}) {
      this.belongsTo(AppointmentStatus, {foreignKey: 'appointments_statusId'});
      this.belongsTo(Client, {foreignKey: 'clientsId'});
      this.belongsTo(Doctor, {foreignKey: 'doctorsId'});
    }
    toJSON(){
      return { ...this.get(), id: undefined }
    }
  };
  Appointment.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }, 
    scheduling_date:{
      type: DataTypes.DATE
    },
    appointment_date: {
      type: DataTypes.DATE
    },
    value: {
      type: DataTypes.FLOAT
    }
  }, {
    sequelize,
    tableName: 'appointments',
    modelName: 'Appointment',
  });
  return Appointment;
};