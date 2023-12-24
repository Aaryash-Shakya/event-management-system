import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

import db from "../models";
import { users } from "../seeders/user";

const createUser = () => {
	users.map(user => {
		db.User.create(user);
	});
};


db.sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log("server started at port: 8000");
		});
	})
	.then(() => {
		// createUser();

        // get users
        db.User.findAll()
			.then(u => {
				console.log('user are');
				console.log(u);
				// Process the fetched users as needed
			})
			.catch(error => {
				console.error("Error fetching data:", error);
			});
	});
