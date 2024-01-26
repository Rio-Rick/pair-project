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
    get month () {
      const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const d = this.createdAt;
      let name = month[d.getMonth()];
      return name
    }
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Post)
      // Profile.belongsToMany(models.Post, {through : "Like", foreignKey : "profile_id"})
      Profile.hasMany(models.Like, {foreignKey : "profile_id"})
    }
  }
  Profile.init({
    UserId : DataTypes.INTEGER,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `username Name can't be null`},
        notEmpty: {
          msg: `username Name can't be empty`
        }
      }},
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `avatar Name can't be null`},
        notEmpty: {
          msg: `avatar Name can't be empty`
        }
      }},
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `about Name can't be null`},
        notEmpty: {
          msg: `about Name can't be empty`
        }
      }},
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};