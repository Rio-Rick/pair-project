'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile, {foreignKey : "ProfileId"})
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