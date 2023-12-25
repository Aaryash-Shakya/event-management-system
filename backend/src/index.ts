import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

import { SequelizeClass } from "../config/sequelize";
import ExampleModel from "./models/example";

const createUser = () => {
	// UserModel.create({
	// 	email: "test@email.com",
	// 	password: "123456",
	// })
};

app.listen(port, () => {
	console.log("server started at port: 8000");
});



const testSequelize = new SequelizeClass();
testSequelize
	.testRun()
	.then(() => {
		// ExampleModel.sync()

		const example = ExampleModel.create({
			name: "aaryash",
			surname: "apple"
		})
	}).then(() =>{
		console.log("example query executed")
	})
	.catch(err => {
		console.log(`error from index: ${err}`);
	});
