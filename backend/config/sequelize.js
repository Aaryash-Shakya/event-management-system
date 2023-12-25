const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

import { Sequelize } from "sequelize";
import { UserModel } from "../src/models/user";
import config from "./config";



const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const DB_sequelize = new Sequelize(
	DB_DATABASE,
	DB_USER, 
	DB_PASSWORD, 
	{
		dialect: "postgres",
		host: DB_HOST,
		timezone: "+05:45"
	}
);

export class SequelizeClass {
	async testRun() {
		try {
			// await DB_sequelize.sync({force:true});
			await DB_sequelize.sync();
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}
}
