'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Post)
      Profile.belongsToMany(models.Post, {through : "Like", foreignKey : "ProId"})
      Profile.hasMany(models.Like, {foreignKey : "ProId"})
    }
  }
  Profile.init({
    UserId : DataTypes.INTEGER,
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    about: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};