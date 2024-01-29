'use strict';
const {
  Model
} = require('sequelize');
const postTime = require('../helpers/postTime');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    time() {
      return postTime(this.createdAt)
    }
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey : "ProfileId"})
      // Post.belongsToMany(models.Profile, {through : "Like", foreignKey : "profile_id"})
      Post.hasMany(models.Like, {foreignKey : "PostId"})
    }
  }
  Post.init({
    ProfileId: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `image can't be null`},
        notEmpty: {
          msg: `image can't be empty`
        }
      }},
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `caption can't be null`},
        notEmpty: {
          msg: `caption can't be empty`
        }
      }},
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `title can't be null`},
        notEmpty: {
          msg: `title can't be empty`
        }
      }},
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};