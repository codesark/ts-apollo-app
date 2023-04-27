import { Model, DataTypes } from "sequelize";
import { db } from "./database";

class History extends Model {}

History.init(
  {
    uniqueId: {
      field: "uniqueid",
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    ts: {
      field: "ts",
      type: DataTypes.DATE,
      unique: true,
      allowNull: false,
    },
    lat: {
      field: "lat",
      type: DataTypes.NUMBER({ precision: 8, scale: 6 }),
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "History",
    tableName: "history",
    timestamps: false,
  }
);

export { History };
