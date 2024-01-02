import { db, Sequelize } from "../models";
import { TokenRepository } from "../repository/tokenRepository";
import { UserRepository } from "../repository/userRepository";
import { Bcrypt } from "../services/bcrypt";
import { Jwt } from "../services/jwt";
import { NodeMailer } from "../services/nodeMailer";
import { Service } from "../services/utils";
import { TokenController } from "./tokenController";

import { Request, Response, NextFunction } from 'express';
type token = {
	purpose: string;
	expires_in: Date;
	value: string;
	userId: number;
};

export class UserController {
	static async getAllUsers(req:Request, res:Response, next:NextFunction) {
		try {
			const users = await UserRepository.findAll();
			res.send(users);
		} catch (err) {
			next(err);
		}
	}

	static async signup(req:Request, res:Response, next:NextFunction) {
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
				type: "admin",
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
				message: "Account Created. Verify your email.",
				user: user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async verifyEmail(req:Request, res:Response, next:NextFunction) {
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
				await TokenRepository.deleteOne({ userId: testUser.id, purpose: "verify-email" });

				res.status(200).json({ message: "Email has been verified successfully" });
			} else {
				Service.createErrorAndThrow("Failed to verify user", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	static async resendVerificationToken(req:Request, res:Response, next:NextFunction) {
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
			const updatedToken = await TokenRepository.update(
				{
					userId: testUser.id,
					purpose: "verify-email",
				},
				{
					value: newVerificationToken,
					expires_in: newVerificationTime,
				}
			);
			if (updatedToken) {
				// send email
				await NodeMailer.sendEmail({
					from: "event-management@api.com",
					to: email,
					subject: "Resend Email Verification",
					text: `To verify your event management account use the OTP ${updatedToken.value}`,
					html: `<a href="https://localhost:3000/api/user/verify-email">Click to verify ${updatedToken.value}</a>`,
				});

				res.status(200).json({
					message: "Verification email resent successfully",
					updatedToken,
				});
			} else {
				Service.createErrorAndThrow("Failed to resend verification email", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	static async login(req:Request, res:Response, next:NextFunction) {
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
				Service.createErrorAndThrow(checkPassword, 401); // forbidden
			}

			// generate new jwt
			const payload = {
				userId: user.id,
				email: user.email,
				type: user.type,
				purpose: "login",
			};
			const jwt = Jwt.signJwt(payload, "10d");

			// send response
			res.status(200).json({
				message: "login successful",
				jwt: jwt,
			});
		} catch (err) {
			next(err);
		}
	}

	static async forgotPassword(req:Request, res:Response, next:NextFunction) {
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
				await TokenRepository.deleteOne({ userId: testUser.id, purpose: "reset-password" });
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
			const payload = {
				userId: testUser.id,
				email: testUser.email,
				type: testUser.type,
				purpose: "reset-password",
			};
			const jwt = Jwt.signJwt(payload, "1hr");

			res.status(200).json({
				message: "Password reset OTP has been sent",
				jwt: jwt,
				user: testUser,
			});
		} catch (err) {
			next(err);
		}
	}

	static async resetPassword(req, res:Response, next:NextFunction) {
		const { email, password, password_reset_token } = req.body;
		// from GlobalMiddleware.authorization
		const decoded = req.decoded;
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

            // delete reset token
            await TokenRepository.deleteOne({ userId: testUser.id, purpose: "reset-password" });

			// update password
			const hashed_password = await Bcrypt.encryptPassword(password);
			const updatedUser = await UserRepository.update({ email: email }, { password: hashed_password });

			res.status(200).json({
				message: "Password reset successful",
			});
		} catch (err) {
			next(err);
		}
	}

	static async getProfile(req, res:Response, next:NextFunction) {
		const decoded = req.decoded;
		const email = req.params.email;
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

			const testUser = await UserRepository.findOne({
				email: email,
			});

			// check if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// check is email is verified
			if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			// only send necessary data
			const user = {
				name: testUser.name,
				email: testUser.email,
				phone: testUser.phone,
				type: testUser.type,
				createdAt: testUser.createdAt,
			};

			res.status(200).json({
				message: "Fetch user successful",
				profile: user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateProfile(req, res:Response, next:NextFunction) {
		const { email, name, phone, type } = req.body;
		const decoded = req.decoded;
		try {
			// test conditions
			// check if jwt exists
			if (!decoded) {
				Service.createErrorAndThrow("JsonWebToken not found", 404); // jwt not found
			}

			// check if jwt is correct
			else if (decoded.email !== email) {
				Service.createErrorAndThrow("Invalid JsonWebToken", 401); // unauthorized
			}

			const testUser = await UserRepository.findOne({
				email: email,
			});

			// check if email exists
			if (!testUser) {
				Service.createErrorAndThrow("Email not registered", 404); // email not found
			}

			// check is email is verified
			if (!testUser.email_verified) {
				Service.createErrorAndThrow("Email not verified", 401); // unauthorized
			}

			// update
			let newData: { name?: string; phone?: string; type?: string } = {};
			if (name !== undefined) {
				newData.name = name;
			}
			if (phone !== undefined) {
				newData.phone = phone;
			}
			if (type !== undefined) {
				newData.type = type;
			}
			await UserRepository.update({ email: email }, newData);
			res.status(200).json({
				message: "Profile update successfully",
			});
		} catch (err) {
			next(err);
		}
	}
}
