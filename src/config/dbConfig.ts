import { Options } from 'sequelize';

export const dbConfig: Options = {
    username: "newuser",
    password: "monikamysql03",
    database: "newdb",
    port: 3306,
    host: "localhost",
    dialect: <const>"mysql",
    operatorsAliases: {},
    pool: {
        max: 100,
        min: 30,
        acquire: 60000,
        idle: 10000
    }
};