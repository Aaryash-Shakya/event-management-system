import { EventRepository } from "../repository/eventRepository";

export class EventController {
	static async getEvents(req, res, next) {
		try {
			const tokens = await EventRepository.findAll({});
			res.status(200).json({ tokens, message: "success" });
		} catch (error) {
			next(error);
		}
	}
}
