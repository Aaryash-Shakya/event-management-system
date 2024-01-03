import { EventRepository } from "../repository/eventRepository";

export class EventController {
	static async getEvents(req, res, next) {
		try {
			const events = await EventRepository.findAll({});
			res.status(200).json({ events, message: "success" });
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
			start_date,
			duration,
			difficulty,
			starting_location,
			ending_location,
		} = req.body;

		const eventData = {
			title,
			description,
			status,
			current_participants,
			maximum_participants,
			start_date,
			duration,
			difficulty,
			starting_location,
			ending_location,
		};
		try {
			const event = await EventRepository.create(eventData);
			res.send(200).json({
				message: "Event created",
				event,
			});
		} catch (err) {
			next(err);
		}
	}
}
