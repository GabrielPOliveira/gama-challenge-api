'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static async validatePassword(password, hash){
      return bcrypt.compare(password, hash);
    }

    static associate(models) {
      // define association here
    }
  };
  User.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    hooks: {
      beforeSave: async (user) => {
        if (user.password){
          user.password = await bcrypt.hash(user.password, 10);

        }
      },
      
    }
  });
  return User;
};