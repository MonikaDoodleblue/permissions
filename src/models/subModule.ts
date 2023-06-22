import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';
import { MainModule } from "./mainModule";

export class SubModule extends Model {
    id: number;
    mainModule_id: number;
    subModule: string;
    createdAt: Date;
    updatedAt: Date;
}

SubModule.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        mainModule_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        subModule: {
            type: new DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'sub_Module',
        sequelize,
    },
);

SubModule.belongsTo(MainModule, {
    foreignKey: "mainModule_id",
    as: "main_Module",
});

(async () => {
    await sequelize.sync();
    console.log("SubModule table created successfully");
})();