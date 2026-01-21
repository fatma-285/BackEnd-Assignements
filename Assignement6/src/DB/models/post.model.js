import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

class postModel extends Model {}

postModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  }
}, {
  sequelize,
  modelName: "post",
  timestamps: true,
  paranoid: true
});

export default postModel;
