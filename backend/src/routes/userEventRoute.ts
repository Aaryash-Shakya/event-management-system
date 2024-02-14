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
		this.router.get(
			"/get-all-data",
			GlobalMiddleware.authorization,
			GlobalMiddleware.checkTypeAdmin,
			UserEventController.getAllData
		);

		this.router.post(
			"/get-participants-by-event",
			UserEventValidator.getParticipantsByEventValidator(),
			GlobalMiddleware.checkValidationError,
			UserEventController.getParticipantsByEvent
		);

		this.router.post(
			"/get-events-by-participant",
			GlobalMiddleware.authorization,
			UserEventValidator.getEventsByParticipantValidator(),
			GlobalMiddleware.checkValidationError,
			UserEventController.getEventsByParticipant
		);
	}

	postRoutes() {
		this.router.post(
			"/join-event",
			GlobalMiddleware.authorization,
			UserEventValidator.joinEventValidator(),
			GlobalMiddleware.checkValidationError,
			UserEventController.joinEvent
		);
	}

	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {
		this.router.delete(
			"/leave-event",
			GlobalMiddleware.authorization,
			UserEventValidator.leaveEventValidator(),
			GlobalMiddleware.checkValidationError,
			UserEventController.leaveEvent
		);
	}
}

export default new UserEventRoute().router;
