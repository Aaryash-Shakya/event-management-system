import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

import { users } from "./seeders/user";
import { UserModel } from "./models/user";
import { SequelizeClass } from "./database/connection";

const createUser = () => {
	UserModel.create({
		id: 0,
		email: "hello@gmail.com",
		password: "TestPassword",
	});
};

app.listen(port, () => {
	console.log("server started at port: 8000");
});



const testSequelize = new SequelizeClass();
testSequelize
	.testRun()
	.then(() => {
		// UserModel.sync()

		// UserModel.create({
		// 	email: "test@email.com",
		// 	password: "123456",
		// })
	})
	.catch(err => {
		console.log(`error from index: ${err}`);
	});
