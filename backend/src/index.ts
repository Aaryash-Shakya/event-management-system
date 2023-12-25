import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

import { SequelizeClass } from "../config/sequelize";
import { DB_sequelize } from "../config/sequelize";
import db from "../models";

app.listen(port, () => {
	console.log("server started at port: 8000");
});



const testSequelize = new SequelizeClass();
testSequelize
	.testRun()
	.then(() => {
		// console.log(db.sequelize.models);
		const user = db.sequelize.models.UserModel.create({
			name: "aaryash",
			email: "aaryash@shakya.com"
		})
	}).then(() =>{
		console.log("example query executed")
	})
	.catch(err => {
		console.log(`error from index: ${err}`);
	});
