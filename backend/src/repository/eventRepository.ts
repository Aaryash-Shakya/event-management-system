import { Sequelize, db } from "../models";

export class EventRepository {
	static async findAll(key: object) {
		return await db.EventModel.findAll({
			where: { ...key },
		});
	}

	static async findOne(key: object) {
		let event = await db.EventModel.findOne({
			where: { ...key },
		});
		if (event) {
			return event.dataValues;
		}
	}

	static async create(eventData: object) {
		let event = await db.EventModel.create(eventData);
		return event.toJSON();
	}

	static async update(key: object, newData: object) {
		let event = await db.EventModel.update(
			{ ...newData },
			{
				where: { ...key },
				returning: true,
				plain: true,
			}
		);
		return event[1].dataValues;
	}
	
	static async delete(key: object) {
		let event = await db.EventModel.destroy({
			where: { ...key },
		});
		return event;
	}
}
