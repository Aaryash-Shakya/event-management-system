import { DataTypes } from "sequelize";
import { DB_sequelize } from "../../config/sequelize";
import db from "../../models";

const UserModel = DB_sequelize.define(
	"user",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		tableName: "users",
		modelName: "User",
	}
);

export default UserModel;
