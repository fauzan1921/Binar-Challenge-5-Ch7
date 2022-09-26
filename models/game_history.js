'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.room)
    }
  }
  game_history.init({
    score: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'game_history',
  });
  return game_history;
};