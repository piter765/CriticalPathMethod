const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Activity extends Model {}

Activity.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "activity",
  }
);
module.exports = Activity;
