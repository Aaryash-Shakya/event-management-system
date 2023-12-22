import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

import db from "../models";
db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log("server started at port: 8000");
	});
});
