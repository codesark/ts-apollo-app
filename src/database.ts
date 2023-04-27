import config from "./config";
import { Sequelize } from "sequelize";

async function connectDB(db: Sequelize): Promise<boolean> {
  try {
    await db.authenticate();
    console.log("Connection to database has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return false;
}
const db = new Sequelize(config.POSTGRES_CONN_STRING, {
  logging: false,
});

export { db, connectDB };
