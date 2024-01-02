import { Sequelize, db } from "../models";

export class EventRepository {
	static async findAll(key: object) {
		return await db.EventModel.findAll({
			where: { ...key },
		});
	}
}
