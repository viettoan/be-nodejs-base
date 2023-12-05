import { DataTypes } from "sequelize";
import sequelize from "../../../database/mysql/index.js";
import Post from "./post.model.js";

const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
        },
        created_at: {
            allowNull: true,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: true,
            type: DataTypes.DATE
        },
    },
    {
        tableName: 'users',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true,
        paranoid: false
    }
);
User.hasMany(
    Post,
    {
        as: 'posts',
        foreignKey: 'user_id',
        sourceKey: 'id',
    }
)

export default User;