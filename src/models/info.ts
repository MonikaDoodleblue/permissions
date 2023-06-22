import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { Group } from "./group";

export class Info extends Model {
    id: number;
    user_name: string;
    email: string;
    password: string;
    role: string;
    updatedAt: Date;
    createdAt: Date;
}

Info.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user'),
            allowNull: false,
            defaultValue: 'user'
        },
    },
    {
        tableName: "info",
        sequelize,
    }
);

Info.belongsTo(Group, {
    foreignKey: "user_id",
    as: "group",
});

(async () => {
    await sequelize.sync();
    console.log("Info table created successfully");
})();