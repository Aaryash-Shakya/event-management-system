import { Sequelize, db } from "../models";

export class UserEventRepository {
	static async findAll(key: object) {
		return await db.UserEventModel.findAll({
			where: { ...key },
		});
	}
}
