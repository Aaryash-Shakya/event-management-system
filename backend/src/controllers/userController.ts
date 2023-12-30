import {db,Sequelize} from "../models";
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

	static async signup(req,res,next){
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
}
