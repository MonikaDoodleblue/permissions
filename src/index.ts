import express from "express";
import router from "./routes";
import { logger } from "../src/winston/logger";
import { verifyDBConnection } from "./config/sequelize";

const port = 5000;

const app = express();

app.use(express.json());

try {
  verifyDBConnection();
  console.log("Database connected successfully");
} catch (e) {
  console.log("Database connection failed", e);
}

app.use((req, res, next) => {
  logger.defaultMeta.path = `${req.method} ${req.path}`;
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on ${port}.`);
});