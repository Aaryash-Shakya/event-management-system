import { Router } from "express";
import { EventController } from "../controllers/eventController";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";
import { EventValidator } from "../validators/eventValidator";

class EventRoute {
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
		this.router.get("/get-events", EventController.getEvents);

		this.router.get(
			"/get-event/:event_id",
			EventValidator.getEventValidator(),
			GlobalMiddleware.checkValidationError,
			EventController.getEvent
		);
	}

	postRoutes() {
		this.router.post(
			"/add-event",
			EventValidator.addEventValidator(),
			GlobalMiddleware.checkValidationError,
			EventController.addEvent
		);
	}

	patchRoutes() {}

	putRoutes() {
		this.router.put(
			"/update-event/:event_id",
			EventValidator.updateEventValidator(),
			GlobalMiddleware.checkValidationError,
			EventController.updateEvent
		)
	}

	deleteRoutes() {
		this.router.delete(
			"/delete-event/:event_id",
			EventValidator.deleteEventValidator(),
			GlobalMiddleware.checkValidationError,
			EventController.deleteEvent,
		)
	}
}

export default new EventRoute().router;
