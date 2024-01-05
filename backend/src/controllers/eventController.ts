import { EventRepository } from "../repository/eventRepository";
import { Service } from "../services/utils";

export class EventController {
	static async getEvents(req, res, next) {
		try {
			const events = await EventRepository.findAll({});
			res.status(200).json({
				events,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	static async addEvent(req, res, next) {
		// default values
		const current_participants = 0;
		const {
			title,
			description,
			status,
			maximum_participants,
			gathering_point,
			destination,
			start_date,
			duration,
			difficulty,
		} = req.body;

		const eventData = {
			title,
			description,
			status,
			current_participants,
			maximum_participants,
			gathering_point,
			destination,
			start_date,
			duration,
			difficulty,
		};
		try {
			const event = await EventRepository.create(eventData);
			console.log(event);
			res.status(200).json({
				message: "Event created",
				event
			});
		} catch (err) {
			next(err);
		}
	}
}
