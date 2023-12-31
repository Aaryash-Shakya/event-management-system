import { db, Sequelize } from "../models";
import { UserRepository } from "../repository/userRepository";
import { Bcrypt } from "../services/bcrypt";
import { Jwt } from "../services/jwt";
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
			const existingUser = await UserRepository.findOne({ email });
			if (existingUser) {
				Service.createErrorAndThrow("Email is already registered", 409); // conflict
			}

			// generate verification OTP
			let verification_token = Service.generateOTP();

			// hash password
			let hashed_password = await Bcrypt.encryptPassword(password);

			// post user
			const data = {
				name,
				email,
				verification_token,
				verification_token_time: Service.generateVerificationTime(new Date(), 5),
				password: hashed_password,
				password_reset_token: -1, // -1 -> not generated
				password_reset_token_time: Service.generateVerificationTime(new Date(), -10), // always expired: 10 min before creating the account
				phone,
				type,
			};
			let user = await UserRepository.create(data);

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

	static async verifyEmail(req, res, next) {
		const { email, verification_token } = req.body;
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

	static async resendVerificationToken(req, res, next) {
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

			// update user
			const updatedUser = await UserRepository.update(
				{ email },
				{
					verification_token: newVerificationToken,
					verification_token_time: newVerificationTime,
				}
			);
			if (updatedUser) {
				res.status(200).json({ message: "Verification email resent successfully", updatedUser });
			} else {
				Service.createErrorAndThrow("Failed to resend verification email", 500);
			}
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
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

			// generate new jwt token
			const payload = {
				userId: user.id,
				email: user.email,
				type: user.type,
				purpose: "login",
			};
			const token = Jwt.signJwt(payload, "10d");

			// send response
			res.status(200).json({
				message: "login successful",
				token: token,
			});
		} catch (err) {
			next(err);
		}
	}

	static async forgotPassword(req, res, next) {
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

            const updatedUser = await UserRepository.update(
                { email: email },
                {
                    password_reset_token: passwordResetToken,
                    password_reset_token_time: passwordResetTokenTime,
                }
            );


            // generate jwt to verify device during reset
            const payload = {
                userId: updatedUser._id,
                email: updatedUser.email,
                type: updatedUser.type,
				purpose: "reset-password",
            };
            const token = Jwt.signJwt(payload, "1hr");

            res.status(200).json({
                message: "Password reset OTP has been sent",
                token: token,
                user: updatedUser,
            });
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
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

            // check if password reset token has expired
            else if (new Date() > testUser.password_reset_token_time) {
                Service.createErrorAndThrow("Password reset token expired", 401); // unauthorized
            }

            // check if password reset OTP hasn't been requested
            else if (password_reset_token === -1) {
                Service.createErrorAndThrow("Password reset token not generated", 400); // bad request
            }

            // check if password reset token is correct
            else if (password_reset_token != testUser.password_reset_token) {
                Service.createErrorAndThrow("Invalid password reset token", 401); // unauthorized
            }

            // generate hashed password
            const hashed_password = await Bcrypt.encryptPassword(password);

            const updatedUser = await UserRepository.update(
                {
                    email: email,
                    password_reset_token: password_reset_token,
                },
                {
                    password: hashed_password,
                    password_reset_token: -1,
                    password_reset_token_time: Service.generateVerificationTime(new Date(), -10),
                }
            );

            res.status(200).json({
                message: "Password reset successful",
            });
        } catch (err) {
            next(err);
        }
    }
}
