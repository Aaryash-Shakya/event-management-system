import { Router } from "express";
import { UserController } from "../controllers/userController";

class UserRouter {
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
		this.router.get("/test-route", (req, res, next) => {
			res.send("success");
		});

		this.router.get("/get-users", UserController.getAllUsers);
	}

	postRoutes() {}
	patchRoutes() {}
	putRoutes() {}
	deleteRoutes() {}
}

export default new UserRouter().router;