'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `First Name can't be null`},
        notEmpty: {
          msg: `First Name can't be empty`
        }
      }},    
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password Name can't be null`},
        notEmpty: {
          msg: `password Name can't be empty`
        }
      }},
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user, options) => {
        user.role = 'user'
        const salt = bcryptjs.genSaltSync(8);
        const hash = bcryptjs.hashSync(user.password, salt)

        user.password = hash
      }
    }
  });
  return User;
};