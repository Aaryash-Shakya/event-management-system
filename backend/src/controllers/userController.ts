import { TokenRepository } from "../repository/tokenRepository";
import { UserRepository } from "../repository/userRepository";
import { Bcrypt } from "../services/bcrypt";
import { Jwt } from "../services/jwt";
import { NodeMailer } from "../services/nodeMailer";
import { Service } from "../services/utils";
import { CustomJwtPayload } from "../types/jwt";
import { SuccessResponse } from "../types/response";

import { Request, Response, NextFunction } from "express";
type token = {
	purpose: string;
	expires_in: Date;
	value: string;
	userId: number;
};

export class UserController {
	static async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			console.log("enter getAllUsers");
			const users = await UserRepository.findAll();
			res.status(200).json({
				status: 200,
				message: "Users fetched successfully",
				users: users,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async signup(req: Request, res: Response, next: NextFunction) {
		let { name, email, password, phone, date_of_birth, gender } = req.body;
		try {
			// check conditions
			// check if email already exists
			const existingUserEmail = await UserRepository.findOne({ email });
			if (existingUserEmail) {
				Service.createErrorAndThrow("Email is already registered", 409); // conflict
			}

			// check if phone already exists
			if (phone !== undefined) {
				const existingUserPhone = await UserRepository.findOne({ phone });
				if (existingUserPhone) {
					Service.createErrorAndThrow("Phone number is already registered", 409); // conflict
				}
			}

			// hash password
			let hashed_password = await Bcrypt.encryptPassword(password);

			// post user
			const data = {
				name,
				email,
				password: hashed_password,
				phone,
				type: "user",
				date_of_birth,
				gender,
			};
			let user = await UserRepository.create(data);

			// generate verification token
			const tokenData: token = {
				purpose: "verify-email",
				expires_in: Service.generateVerificationTime(new Date(), 5),
				value: Service.generateOTP(),
				userId: user.id,
			};
			let token = await TokenRepository.create(tokenData);

			// send email
			await NodeMailer.sendEmail({
				from: "event-management@api.com",
				to: user.email,
				subject: "Email Verification",
				text: `To verify your event management account use the OTP ${token.value}`,
				html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${token.value}</a>`,
			});

			// ! whats the convention do you use return on res.send call.
			// ! logically it doesn't makes any difference
			return res.status(200).json({
				status: 200,
				message: "Account Created. Verify your email.",
				user: user,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async verifyEmail(req: Request, res: Response, next: NextFunction) {
		const { email, email_verification_token } = req.body;
		try {
			// test conditions
			const testUser = await UserRepository.findOne({ email });

			// if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// if email is already verified
			if (testUser.email_verified) {
				Service.createErrorAndThrow("Email already verified", 400); // bad request
			}

			const token: token = await TokenRepository.findOne({
				userId: testUser.id,
				purpose: "verify-email",
			});

			// if token doesn't exists
			if (!token) {
				Service.createErrorAndThrow("Token not generated", 400); // bad request
			}

			// if verification token has expired
			if (new Date() > token.expires_in) {
				Service.createErrorAndThrow("Email verification token expired", 401); // unauthorized
			}

			// if verification token is incorrect
			else if (email_verification_token !== token.value) {
				Service.createErrorAndThrow("Invalid Verification Token", 401); // unauthorized
			}

			// update user
			const user = await UserRepository.update(
				{ email },
				{
					email_verified: true,
				}
			);

			if (user) {
				// delete token
				await TokenRepository.delete({ userId: testUser.id, purpose: "verify-email" });

				res.status(200).json({
					status: 200,
					message: "Email has been verified successfully",
				} as SuccessResponse);
			} else {
				Service.createErrorAndThrow("Failed to verify user", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	static async resendVerificationToken(req: Request, res: Response, next: NextFunction) {
		const email = req.body.email;
		try {
			const testUser = await UserRepository.findOne({ email });

			// test conditions
			// check if email is correct
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// check if email is already verified
			else if (testUser.email_verified === true) {
				Service.createErrorAndThrow("Email already verified", 400); // bad request
			}

			// generate new token and update time
			const newVerificationToken = Service.generateOTP();
			const newVerificationTime = Service.generateVerificationTime(new Date(), 5);

			// update token
			const testToken = await TokenRepository.findOne({
				userId: testUser.id,
				purpose: "verify-email",
			});
			let token: any;
			// if no existing token generate new token
			if (!testToken) {
				token = await TokenRepository.create({
					purpose: "verify-email",
					expires_in: newVerificationTime,
					value: newVerificationToken,
					userId: testUser.id,
				});
			}
			// else update existing token
			else {
				token = await TokenRepository.update(
					{
						userId: testUser.id,
						purpose: "verify-email",
					},
					{
						value: newVerificationToken,
						expires_in: newVerificationTime,
					}
				);
			}
			if (token) {
				// send email
				await NodeMailer.sendEmail({
					from: "event-management@api.com",
					to: email,
					subject: "Resend Email Verification",
					text: `To verify your event management account use the OTP ${token.value}`,
					html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${token.value}</a>`,
				});

				res.status(200).json({
					status: 200,
					message: "Verification email resent successfully",
					token,
				} as SuccessResponse);
			} else {
				Service.createErrorAndThrow("Failed to resend verification email", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		try {
			let user = await UserRepository.findOne({ email: email });

			// test condition
			// check if user exists
			if (!user) {
				Service.createErrorAndThrow("Account not found", 404);
			}

			// check if user email is verified
			if (!user.email_verified) {
				Service.createErrorAndThrow("Email not Verified", 401); // unauthorized
			}

			// check password is correct
			const checkPassword = await Bcrypt.comparePassword(password, user.password);
			if (checkPassword !== true) {
				Service.createErrorAndThrow("Incorrect password", 401); // forbidden
			}

			// generate new jwt
			const payload: CustomJwtPayload = {
				userId: user.id,
				email: user.email,
				type: user.type,
				purpose: "login",
			};
			const jwt = Jwt.signJwt(payload, "10d");

			// send response
			res.status(200).json({
				status: 200,
				message: "Login successful",
				jwt: jwt,
			});
		} catch (err) {
			next(err);
		}
	}

	static async forgotPassword(req: Request, res: Response, next: NextFunction) {
		const email = req.body.email;
		try {
			const testUser = await UserRepository.findOne({ email: email });

			// test conditions
			// check if user exist
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}
			// check if email is verified
			else if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			// update token
			const passwordResetToken = Service.generateOTP();
			const passwordResetTokenTime = Service.generateVerificationTime(new Date(), 5);

			const existingToken = await TokenRepository.findAll({
				userId: testUser.id,
			});

			// if reset token exists delete old token
			if (existingToken) {
				await TokenRepository.delete({ userId: testUser.id, purpose: "reset-password" });
			}
			let token = await TokenRepository.create({
				purpose: "reset-password",
				expires_in: passwordResetTokenTime,
				value: passwordResetToken,
				userId: testUser.id,
			});

			// send email
			await NodeMailer.sendEmail({
				from: "event-management@api.com",
				to: email,
				subject: "Reset Password",
				text: `To reset your account password use the OTP ${token.value}`,
				html: `<a href="https://localhost:3000/api/user/reset-password">Click to reset password ${token.value}</a>`,
			});

			// generate jwt to verify device during reset
			const payload: CustomJwtPayload = {
				userId: testUser.id,
				email: testUser.email,
				type: testUser.type,
				purpose: "reset-password",
			};
			const jwt = Jwt.signJwt(payload, "5m");

			res.status(200).json({
				status: 200,
				message: "Password reset OTP has been sent",
				jwt: jwt,
				user: testUser,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async resetPassword(req: Request, res: Response, next: NextFunction) {
		const { email, password, password_reset_token } = req.body;
		// from GlobalMiddleware.authorization
		const decoded = req.body.decoded;
		try {
			// test conditions
			// check if jwt exists
			if (!decoded) {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}

			// check if jwt is correct
			else if (decoded.email !== email) {
				Service.createErrorAndThrow("Invalid JsonWebToken, email doesn't match", 401); // unauthorized
			}

			const testUser = await UserRepository.findOne({ email: email });

			// check if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// check is email is verified
			if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			const resetToken = await TokenRepository.findOne({
				userId: decoded.userId,
				purpose: "reset-password",
			});

			// check if password reset OTP hasn't been requested
			if (!resetToken) {
				Service.createErrorAndThrow("Password reset token not generated", 400); // bad request
			}

			// check if password reset token has expired
			else if (new Date() > resetToken.expires_in) {
				Service.createErrorAndThrow("Password reset token expired", 401); // unauthorized
			}

			// check if password reset token is correct
			else if (password_reset_token !== resetToken.value) {
				Service.createErrorAndThrow("Invalid password reset token", 401); // unauthorized
			}

			// update password
			const hashed_password = await Bcrypt.encryptPassword(password);
			const updatedUser = await UserRepository.update({ email: email }, { password: hashed_password });

			// delete reset token
			await TokenRepository.delete({ userId: testUser.id, purpose: "reset-password" });

			res.status(200).json({
				status: 200,
				message: "Password reset successful",
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async getProfile(req: Request, res: Response, next: NextFunction) {
		const decoded: CustomJwtPayload = req.body.decoded;
		const user_id = parseInt(req.params.user_id);
		try {
			// test conditions
			// check if jwt exists
			if (!decoded) {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}

			const testUser = await UserRepository.findOne({
				id: user_id,
			});

			// check if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// check is email is verified
			if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			// only send necessary data to visitor
			let user = {
				id: testUser.id,
				name: testUser.name,
				date_of_birth: testUser.date_of_birth,
				gender: testUser.gender,
				email: testUser.email,
				createdAt: testUser.createdAt,
			};

			if (decoded.type === "admin" || decoded.userId == user_id) {
				user = testUser;
			}

			res.status(200).json({
				status: 200,
				message: "Fetch user successful",
				profile: user,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async updateProfile(req: Request, res: Response, next: NextFunction) {
		const { email, name, gender, phone, type } = req.body;
		const decoded: CustomJwtPayload = req.body.decoded;
		try {
			// test conditions
			// check if jwt exists
			if (!decoded) {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}

			const testUser = await UserRepository.findOne({
				id: decoded.userId,
			});

			// check is email is verified
			if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			// update
			let newData: {
				name?: string;
				phone?: string;
				type?: string;
				gender?: string;
				email?: string;
				email_verified?: boolean;
			} = {};
			if (name !== undefined) {
				newData.name = name;
			}
			if (phone !== undefined) {
				newData.phone = phone;
			}
			if (type !== undefined) {
				newData.type = type;
			}
			if (gender !== undefined) {
				newData.gender = gender;
			}
			if (email !== undefined) {
				newData.email = email;
			}
			if (testUser.email !== email) {
				newData.email_verified = false;
			}
			await UserRepository.update({ id: decoded.userId }, newData);
			res.status(200).json({
				status: 200,
				message: "Profile update successfully",
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		const { email, password } = req.body;
		try {
			// test conditions
			const testUser = await UserRepository.findOne({
				email,
			});

			// check if user exists
			if (!testUser) {
				Service.createErrorAndThrow("User not registered", 404); // user not found
			}

			// confirm password
			const checkPassword = await Bcrypt.comparePassword(req.body.password, testUser.password);
			if (checkPassword !== true) {
				Service.createErrorAndThrow("Incorrect password", 401); // forbidden
			}

			// update token
			const userDeletionToken = Service.generateOTP();
			const userDeletionTokenTime = Service.generateVerificationTime(new Date(), 5);

			// if reset token exists delete old token
			await TokenRepository.delete({ userId: testUser.id, purpose: "delete-user" });

			let token = await TokenRepository.create({
				purpose: "delete-user",
				expires_in: userDeletionTokenTime,
				value: userDeletionToken,
				userId: testUser.id,
			});

			const payload: CustomJwtPayload = {
				userId: testUser.id,
				email: testUser.email,
				type: testUser.type,
				purpose: "delete-user",
			};
			const jwt = Jwt.signJwt(payload, "5m");

			// send email
			await NodeMailer.sendEmail({
				from: "event-management@api.com",
				to: email,
				subject: "Deletion of User Account",
				text: `To reset your account password use the OTP ${userDeletionToken}`,
				html: `<a href="https://localhost:3000/api/user/confirm-delete-user">Click to reset password ${userDeletionToken}</a>`,
			});

			res.status(200).json({
				status: 200,
				message: "Account Deletion OTP sent in email",
				jwt: jwt,
				token: userDeletionToken,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async confirmDeleteUser(req: Request, res: Response, next: NextFunction) {
		const { email, delete_user_token } = req.body;
		// from GlobalMiddleware.authorization
		const decoded = req.body.decoded;
		try {
			// if jwt doesn't exists
			if (!decoded) {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}

			// if jwt is incorrect
			else if (decoded.email !== email) {
				Service.createErrorAndThrow("Invalid JsonWebToken, email doesn't match", 401); // unauthorized
			}

			const testUser = await UserRepository.findOne({ email: email });

			// if email doesn't exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			const deleteToken = await TokenRepository.findOne({
				userId: decoded.userId,
				purpose: "delete-user",
			});

			// check if account deletion OTP hasn't been requested
			if (!deleteToken) {
				Service.createErrorAndThrow("Account deletion token not generated", 400); // bad request
			}

			// check if password reset token has expired
			else if (new Date() > deleteToken.expires_in) {
				Service.createErrorAndThrow("Account deletion token expired", 401); // unauthorized
			}

			// check if password reset token is correct
			else if (delete_user_token !== deleteToken.value) {
				Service.createErrorAndThrow("Invalid account deletion token", 401); // unauthorized
			}

			// delete user
			await UserRepository.delete({ email: email });

			// delete all token associated to user
			await TokenRepository.delete({ userId: testUser.id });

			res.status(200).json({
				status: 200,
				message: "Account deleted successfully",
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async verifyJwt(req: Request, res: Response, next: NextFunction) {
		const decoded: CustomJwtPayload = req.body.decoded;
		try {
			if (decoded) {
				res.status(200).json({
					status: 200,
					message: "JsonWebToken is verified",
					type: decoded.type,
					userId: decoded.userId,
					email: decoded.email,
				} as SuccessResponse);
			} else {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}
		} catch (err) {
			next(err);
		}
	}
}
