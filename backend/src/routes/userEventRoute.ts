import { Router } from "express";
import { UserEventController } from "../controllers/userEventController";

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
		this.router.post("/join-user", UserEventController.joinEvent);
	}
	
	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {}
}

export default new UserEventRoute().router;
