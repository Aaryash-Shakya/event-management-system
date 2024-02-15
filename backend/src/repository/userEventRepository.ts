import { Sequelize, db } from "../models";

export class UserEventRepository {
	static async findAll(key: object) {
		return await db.UserEventModel.findAll({
			where: { ...key },
		});
	}

	static async findOne(key: object) {
		const data = await db.UserEventModel.findOne({
			where: { ...key },
		});
		if (data) return data.dataValues;
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

	static async update(key: object, newData: object) {
		console.log("update called");
		let userEvent = await db.UserEventModel.update(
			{ ...newData },
			{
				where: { ...key },
				returning: true,
				plain: true,
			}
		);
		if (userEvent[1]) {
			return userEvent[1].dataValues;
		}
	}

	static async findAllAndJoinEvents(key: object) {
		return await db.UserEventModel.findAll({
			where: { ...key },
			include: db.EventModel,
		});
	}
	
	// ! ask how to filter the data being queried due to include
	static async findAllAndJoinUsers(key: object) {
		return await db.UserEventModel.findAll({
			where: { ...key },
			include: db.UserModel,
		});
	}
}
