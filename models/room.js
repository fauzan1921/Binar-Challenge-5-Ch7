'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user)
      this.hasOne(models.game_history)
    }
  }
  room.init({
    name: DataTypes.STRING,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING,
    player1choice: DataTypes.STRING,
    player2choice: DataTypes.STRING,
    result: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};