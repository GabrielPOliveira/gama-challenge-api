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
        unique: true,
        validate: {
          len: {args:[0, 20], msg: 'Login deve ter até 20 caracteres'}
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Usuário precisa de uma senha'},
          len: {
            args: [8, 100], 
            msg: 'Senha deve ter no mínimo 8 caracteres'},          
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Usuário precisa de uma nome'},
          notEmpty: {msg: 'Nome não pode ser vazio'},          
        }
      },
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  });
  return User;
};