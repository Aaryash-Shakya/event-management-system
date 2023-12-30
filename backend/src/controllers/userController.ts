import {db,Sequelize} from "../models";
import { findAll } from "../repository/userRepository";

export class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const users = await findAll();
			res.send(users);
		} catch (err) {
			next(err);
		}
	}

	static async signup(req,res,next){
		
	}
}
