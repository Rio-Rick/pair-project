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

      Profile.belongsToMany(models.Post, {through: 'Likes'}, {foreignKey: "ProfileId"})
      Profile.hasMany(models.Like, {
        foreignKey: "ProfileId"
      })



    }
  }
  Profile.init({
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    about: DataTypes.STRING,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};