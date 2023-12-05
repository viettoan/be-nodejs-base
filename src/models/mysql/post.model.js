import { DataTypes } from "sequelize";
import sequelize from "../../../database/mysql/index.js";

const Post = sequelize.define(
    'Post',
    {
        user_id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
        },
        title: {
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
        tableName: 'posts',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true,
        paranoid: false
    }
);

export default Post;