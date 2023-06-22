import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { SubModule } from './subModule';
import { Group } from './group';

export class Permission extends Model {
    id: number;
    group_id: number;
    subModule_id: number;
    all: boolean;
    create: boolean;
    view: boolean;
    canUpdate: boolean;
    delete: boolean;
    createdAt: Date;
    updatedAt: Date;
}

Permission.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        group_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        subModule_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        all: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        create: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        view: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        canUpdate: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        delete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'permission',
        sequelize,
    },
);

Permission.belongsTo(SubModule, { foreignKey: 'subModule_id' });
Permission.belongsTo(Group, { foreignKey: 'group_id' });

(async () => {
    await sequelize.sync();
    console.log("Permission table created successfully");
})();
