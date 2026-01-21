import { DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const userModel = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkNameLength(value) {
        if (value.length < 3) {
          throw new Error("Name must be greater than 3 chars");
        }
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      checkPasswordLength(value) {
        if (value.length < 6) {
          throw new Error("Password must be greater than 6 chars");
        }
      },
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false,
  },
}, {
  timestamps: true
});

export default userModel;
