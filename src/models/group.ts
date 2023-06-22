import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class Group extends Model {
    id: number;
    group_name: string;
    description: string;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
}

Group.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        group_name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'group',
        sequelize,
    },
);

(async () => {
    await sequelize.sync();
    console.log("Group table created successfully");
})();