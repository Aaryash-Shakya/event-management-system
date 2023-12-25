/*
import Sequelize from "sequelize";
import { UserModel } from "../models/user";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import user from "../models/user";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	dialect: "postgres",
	host: DB_HOST,
	port: Number(DB_PORT),
	timezone: "+05:45",
	define: {
		charset: "utf8mb4",
		collate: "utf8mb4_general_ci",
		underscored: true,
		freezeTableName: true,
	},
	pool: {
		min: 0,
		max: 5,
	},
	benchmark: true,
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch(error => {
		console.error("Unable to connect to the database:", error);
	});

export const DB = {
	Users: user(sequelize),
	sequelize, // connection instance (RAW queries)
	Sequelize, // library
};
*/

import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });
import { Sequelize } from "sequelize";
import { UserModel } from "../models/user";
// Option 3: Passing parameters separately (other dialects)

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const password = String(DB_PASSWORD)

export class SequelizeClass {
	sequelize;

	constructor() {
		this.sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
			dialect: "postgres",
			host: DB_HOST,
		});
	}

	async testRun() {
		try {
			await this.sequelize.sync({force:true});
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	}
}
