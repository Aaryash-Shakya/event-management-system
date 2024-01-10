import { Sequelize, db } from "../models";

export class UserEventRepository {
	static async findAll(key: object) {
		return await db.UserEventModel.findAll({
			where: { ...key },
		});
	}

	static async findOne(key: object) {
		const data =  await db.UserEventModel.findOne({
			where: { ...key },
		});
		if(data) return data.dataValues;
	}

	static async create(userData: object) {
		let user = await db.UserEventModel.create(userData);
		return user.toJSON();
	}

	static async delete(key: object) {
		let user = await db.UserEventModel.destroy({
			where: { ...key },
		});
		return user;
	}
}
