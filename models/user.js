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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
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