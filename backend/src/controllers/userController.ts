import { db, Sequelize } from "../models";
import { UserRepository } from "../repository/userRepository";
import { Service } from "../services/utils";

export class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const users = await UserRepository.findAll();
			res.send(users);
		} catch (err) {
			next(err);
		}
	}

	static async signup(req, res, next) {
		let { name, email, password, phone, type } = req.body;
		try {
			// check conditions
			// check if email already exists
			const existingUser = await UserRepository.findOne(email);
			if (existingUser) {
				Service.createErrorAndThrow("Email is already registered", 409); // conflict
			}

			// generate verification OTP
			let verification_token = Service.generateOTP();

			// post user
			const data = {
				name,
				email,
				verification_token,
				verification_token_time: Service.generateVerificationTime(new Date(), 5),
				password,
				password_reset_token: -1, // -1 -> not generated
				password_reset_token_time: Service.generateVerificationTime(new Date(), -10), // always expired: 10 min before creating the account
				phone,
				type,
			};
			let user = await UserRepository.create(data);

			return res.status(200).json({
				message: "Account Created. Verify your email.",
				user: user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async verifyEmail(req, res, next) {
		const { email, verification_token } = req.body;
		try {
			// test conditions
			const testUser = await UserRepository.findOne(email);

			// if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// if email is already verified
			if (testUser.email_verified) {
				Service.createErrorAndThrow("Email already verified", 400); // bad request
			}

			// if verification token has expired
			else if (new Date() > testUser.verification_token_time) {
				Service.createErrorAndThrow("Email verification token expired", 401); // unauthorized
			}

			// if verification token is incorrect
			else if (verification_token != testUser.verification_token) {
				Service.createErrorAndThrow("Invalid Verification Token", 401); // unauthorized
			}

			// update user
			const user = await UserRepository.update(
				{ email, verification_token },
				{
					email_verified: true,
				}
			);

			// ! how to handle error in db operation if repo handles db interaction

			if (user) {
				res.status(200).json({ message: "Email has been verified successfully" });
			} else {
				Service.createErrorAndThrow("Failed to verify user", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	
}
