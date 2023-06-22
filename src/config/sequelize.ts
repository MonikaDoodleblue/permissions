import { Sequelize } from "sequelize";
import { dbConfig } from "./dbConfig";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export const verifyDBConnection = async () => {
  return await sequelize.authenticate();
};

// const mainModule = require("../models/mainModule");
// const subModule = require("../models/subModule");
// const permission = require("../models/permission");
// const info = require("../models/info");
// const group = require("../models/group");

// sequelize.sync();