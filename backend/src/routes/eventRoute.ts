import { Router } from "express";
import { EventController } from "../controllers/eventController";

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
	}

	postRoutes() {
		this.router.post("/add-event", EventController.addEvent);
	}
	
	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {}
}

export default new EventRoute().router;
