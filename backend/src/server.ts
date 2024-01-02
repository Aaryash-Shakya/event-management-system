import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { SequelizeClass } from "../config/sequelize";
import userRoute from "./routes/userRoute";
import tokenRoute from "./routes/tokenRoute";
import eventRoute from "./routes/eventRoute";

export class Server {
	public app: express.Application = express();

	constructor() {
		this.setConfiguration();

		// initialize all routes
		this.setRoutes();

		// if route not found above rest are handled by handle404Error
		this.handle404Error();

		// only accessed when a route redirects to it by calling next(error:Error)
		this.handleErrors();
	}

	setConfiguration() {
		// connect to db
		this.connectDatabase();
		// parse form
		this.configureBodyParser();
		this.app.use(cors());
		this.app.use(express.json());
	}

	async connectDatabase() {
		const sequelize = new SequelizeClass();
		await sequelize.syncDatabase();
	}

	configureBodyParser() {
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	setRoutes() {
		this.app.use("/api/user", userRoute);
		this.app.use("/api/token", tokenRoute);
		this.app.use("/api/event", eventRoute);
	}

	handle404Error() {
		this.app.use((req, res) => {
			res.status(404).json({
				status: 404,
				message: "Not Found",
			});
		});
	}

	handleErrors() {
		this.app.use((error, req, res, next) => {
			let errorStatus = (error as any).errorStatus || 500;
			let errorMessage = error.message || "Something went wrong. Please try again later";

			console.log(`\nerror occurred: ${error.name} ${error.errorStatus} ${error.message}`);
			console.log(error);
			res.status(errorStatus).json({
				errorName: error.name,
				status: errorStatus,
				message: errorMessage,
			});
		});
	}
}
