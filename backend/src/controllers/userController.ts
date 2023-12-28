import {db,Sequelize} from "../models";

export class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const users = await db.UserModel.findAll();
			res.send(users);
		} catch (err) {
			next(err);
		}
	}
}
