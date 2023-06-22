import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class MainModule extends Model {
    id: number;
    module: string;
    createdAt: Date;
    updatedAt: Date;
}

MainModule.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        module: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'main_Module',
        sequelize,
    },
);

(async () => {
    await sequelize.sync();
    console.log("MainModule table created successfully");
})();