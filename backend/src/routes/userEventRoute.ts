import { Router } from "express";
import { UserEventController } from "../controllers/userEventController";
import { UserEventValidator } from "../validators/userEventValidator";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";

class UserEventRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.getRoutes();
		this.postRoutes();
		this.patchRoutes();
		this.putRoutes();
		this.deleteRoutes();
	}

	getRoutes() {
		this.router.get("/get-all-data", UserEventController.getAllData);
	}

	postRoutes() {
		this.router.post(
			"/join-event",
			UserEventValidator.joinEventValidator(),
			GlobalMiddleware.checkValidationError,
			UserEventController.joinEvent
		);
	}

	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {}
}

export default new UserEventRoute().router;
