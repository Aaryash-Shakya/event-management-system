import { Sequelize, db } from "../models";

// NOTE this syntax supports intelisense
// Sequelize.Model

export class UserRepository {
	static async findAll() {
		return await db.UserModel.findAll();
	}

	static async findOne(userEmail: String) {
		return await db.UserModel.findOne({ 
            where: { email: userEmail } 
        });
	}

	static async create(userData) {
		let user = await db.UserModel.create(userData);
        return user.toJSON();
	}
}
