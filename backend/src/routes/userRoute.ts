import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserRepository } from "../repository/userRepository";
import { UserValidator } from "../validators/userValidator";
import { GlobalMiddleware } from "../middlewares/globalMiddleware";

class UserRoute {
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

		this.router.get(
			"/get-users",
			GlobalMiddleware.authorization,
			GlobalMiddleware.checkTypeAdmin,
			UserController.getAllUsers
		);

		this.router.get(
			"/get-profile/:email",
			GlobalMiddleware.authorization,
			UserValidator.getProfileValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.getProfile
		);

		this.router.get(
			"/verify-jwt",
			GlobalMiddleware.authorization,
			UserController.verifyJwt
		);
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

		this.router.post(
			"/forgot-password",
			UserValidator.forgotPasswordValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.forgotPassword
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

		this.router.patch(
			"/reset-password",
			GlobalMiddleware.authorization,
			UserValidator.resetPasswordValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.resetPassword
		);

		this.router.patch(
			"/update-profile",
			GlobalMiddleware.authorization,
			UserValidator.updateProfileValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.updateProfile
		);
	}

	putRoutes() {}
	deleteRoutes() {
		this.router.delete(
			"/delete-user",
			UserValidator.deleteUserValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.deleteUser
		);

		this.router.delete(
			"/confirm-delete-user",
			GlobalMiddleware.authorization,
			UserValidator.confirmDeleteUserValidator(),
			GlobalMiddleware.checkValidationError,
			UserController.confirmDeleteUser
		);
	}
}

export default new UserRoute().router;
