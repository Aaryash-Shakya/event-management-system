import { Sequelize, db } from "../models";

export class EventRepository {
	static async findAll(key: object) {
		return await db.EventModel.findAll({
			where: { ...key },
		});
	}

	static async create(eventData: object) {
		let event = await db.EventModel.create(eventData);
		return event.toJSON();
	}
}
