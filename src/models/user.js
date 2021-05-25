'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init(
  {   uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Usuário precisa de um login!'},
          notEmpty: {msg: 'Login não pode ser vazio'},
          max: {args:[20], msg: 'Login deve ter até 20 caracteres'},
          unique: {args:[true], msg: 'Login já cadastrado'}
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: 'Usuário precisa de uma senha'},
          notEmpty: {msg: 'Senha não pode ser vazio'},
          min: {args:[8], msg: 'Senha deve ter no mínimo 8 caracteres'},          
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
  });
  return User;
};