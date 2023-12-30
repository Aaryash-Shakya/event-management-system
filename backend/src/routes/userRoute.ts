import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repository/userRepository";

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
			res.send(UserRepository.findOne({ email: "rs9995@gmail.com" }));
		});

		this.router.get("/get-users", UserController.getAllUsers);
	}

	postRoutes() {
		this.router.post("/signup", UserController.signup);
	}

	patchRoutes() {
		this.router.patch("/verify-email", UserController.verifyEmail);
		
		this.router.patch("/resend-verification-token", UserController.resendVerificationToken);
	}

	putRoutes() {}
	deleteRoutes() {}
}

export default new UserRouter().router;
