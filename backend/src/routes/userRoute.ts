import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repository/userRepository";
import { UserValidator } from "../validators/userValidator";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";

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
		this.router.post(
			"/signup",
			UserValidator.signupValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.signup
		);

		this.router.post(
			"/login",
			UserValidator.loginValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.login
		);
	}

	patchRoutes() {
		this.router.patch(
			"/verify-email",
			UserValidator.verifyEmailValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.verifyEmail
		);

		this.router.patch(
			"/resend-verification-token",
			UserValidator.resendVerificationTokenValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.resendVerificationToken
		);
	}

	putRoutes() {}
	deleteRoutes() {}
}

export default new UserRouter().router;
