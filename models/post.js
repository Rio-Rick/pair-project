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
      Post.belongsTo(models.Profile)
      Post.belongsToMany(models.Profile, {through : "Like", foreignKey : "profile_id"})
      Post.hasMany(models.Like, {foreignKey : "PostId"})
    }
  }
  Post.init({
    ProfileId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    caption: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};