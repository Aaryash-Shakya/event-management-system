import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { DB_sequelize } from "../config/sequelize";
import { SequelizeClass } from "../config/sequelize";

export class Server {
	public app: express.Application = express();

	constructor() {
		this.setConfiguration();
		this.setRoutes();
		this.handle404Error();
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

	async connectDatabase(){
		const sequelize = new SequelizeClass;
		await sequelize.syncDatabase();
	}

	configureBodyParser() {
		this.app.use(bodyParser.urlencoded({ extended: true }));
	}

	setRoutes() {
		this.app.use("/api/user");
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

			console.log(`error occurred: ${error.name} ${error.errorStatus} ${error.message}`);
			console.log(error);
			res.status(errorStatus).json({
				errorName: error.name,
				status: errorStatus,
				message: errorMessage,
			});
		});
	}
}
