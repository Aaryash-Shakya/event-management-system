import { Sequelize } from "sequelize";
import { EventRepository } from "../repository/eventRepository";
import { UserEventRepository } from "../repository/userEventRepository";
import { UserRepository } from "../repository/userRepository";
import { Service } from "../services/utils";

export class UserEventController {
	static async getAllData(req, res, next) {
		try {
			const data = await UserEventRepository.findAll({});
			res.send(data);
		} catch (error) {
			next(error);
		}
	}

	static async joinEvent(req, res, next) {
		const { user_id, event_id } = req.body;
		try {
			const testUser = await UserRepository.findOne({ id: user_id });
			if (!testUser) {
				Service.createErrorAndThrow("User not found", 404);
			} else if (testUser.email_verified === false) {
				Service.createErrorAndThrow("User email not verified", 400);
			}

			const testEvent = await EventRepository.findOne({ event_id: event_id });
			if (!testEvent) {
				Service.createErrorAndThrow("Event not found", 404);
			} else if (testEvent.current_participants >= testEvent.maximum_participants) {
				Service.createErrorAndThrow("Event is full", 400);
			}

			const userEvent = await UserEventRepository.create({ user_id, event_id });

			// update current_participants
			const updatedEvent = await EventRepository.update(
				{ event_id },
				// { current_participants: Sequelize.literal("current_participants + 1") },
				{ current_participants: testEvent.current_participants + 1 }
			);

			res.status(200).json({ message: "event joined" });
		} catch (error) {
			next(error);
		}
	}
}
