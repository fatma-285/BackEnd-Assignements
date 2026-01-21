import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
class commentModel extends Model {}

commentModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }, userId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "posts",
                key: "id"
            }
        }
    },
    {
        sequelize,
        modelName: "comment",
        timestamps: true,
    })
export default commentModel