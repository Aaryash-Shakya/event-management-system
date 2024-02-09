import { Sequelize } from "sequelize";
import { EventRepository } from "../repository/eventRepository";
import { UserEventRepository } from "../repository/userEventRepository";
import { UserRepository } from "../repository/userRepository";
import { Service } from "../services/utils";
import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../types/response";

export class UserEventController {
	static async getAllData(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await UserEventRepository.findAll({});
			res.status(200).json({
				status: 200,
				message: "Events retrieved by Participant",
				data,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async getParticipantsByEvent(req: Request, res: Response, next: NextFunction) {
		const { event_id, status } = req.body;
		const queryKey: any = { event_id };
		if (status) queryKey.status = status;

		try {
			const data = await UserEventRepository.findAll(queryKey);
			res.status(200).json({
				status: 200,
				message: "Events retrieved by Participant",
				data,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async getEventsByParticipant(req: Request, res: Response, next: NextFunction) {
		const { user_id, status } = req.body;
		const decoded = req.body.decoded;
		const queryKey: any = {
			user_id: user_id,
		};
		if (status) queryKey.status = status;

		try {
			if (decoded.userId != user_id) {
				Service.createErrorAndThrow("Unauthorized user", 401);
			}

			const data = await UserEventRepository.findAll(queryKey);
			res.status(200).json({
				status: 200,
				message: "Events retrieved by Participant",
				data,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async joinEvent(req: Request, res: Response, next: NextFunction) {
		const { user_id, event_id, decoded } = req.body;
		try {
			const testUser = await UserRepository.findOne({ id: user_id });
			// if jwt doesn't belong to user_id
			if (decoded.id !== user_id) {
				Service.createErrorAndThrow("Unauthorized user", 401);
			}
			// if user not found
			else if (!testUser) {
				Service.createErrorAndThrow("User not found", 404);
			}
			// if email not verified
			else if (testUser.email_verified === false) {
				Service.createErrorAndThrow("User email not verified", 400);
			}

			const testEvent = await EventRepository.findOne({ event_id: event_id });
			if (!testEvent) {
				Service.createErrorAndThrow("Event not found", 404);
			}
			// if event isn't upcoming, don't allow user to join
			else if (testEvent.event_status !== "upcoming") {
				Service.createErrorAndThrow(`Cannot join ${testEvent.event_status} event`, 400);
			}
			// if event is full
			else if (testEvent.current_participants >= testEvent.maximum_participants) {
				Service.createErrorAndThrow("Event is full", 400);
			}

			const testUserEvent = await UserEventRepository.findOne({ user_id, event_id });
			if (testUserEvent) {
				Service.createErrorAndThrow("User already joined event", 400);
			}

			const userEvent = await UserEventRepository.create({ user_id, event_id, status: "payment not made" });

			// update current_participants
			const updatedEvent = await EventRepository.update(
				{ event_id },
				// { current_participants: Sequelize.literal("current_participants + 1") },
				{ current_participants: testEvent.current_participants + 1 }
			);

			res.status(200).json({
				status: 200,
				message: "Event joined",
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async leaveEvent(req: Request, res: Response, next: NextFunction) {
		const { user_id, event_id, decoded } = req.body;
		try {
			const testUser = await UserRepository.findOne({ id: user_id });
			// if jwt doesn't belong to user_id
			if (decoded.id !== user_id) {
				Service.createErrorAndThrow("Unauthorized user", 401);
			}
			// if user not found
			else if (!testUser) {
				Service.createErrorAndThrow("User not found", 404);
			}
			// if email not verified
			else if (testUser.email_verified === false) {
				Service.createErrorAndThrow("User email not verified", 400);
			}

			const testEvent = await EventRepository.findOne({ event_id: event_id });
			if (!testEvent) {
				Service.createErrorAndThrow("Event not found", 404);
			}

			const testUserEvent = await UserEventRepository.findOne({ user_id, event_id });
			if (!testUserEvent) {
				Service.createErrorAndThrow("User hasn't joined event", 400);
			}

			const userEvent = await UserEventRepository.update(
				{
					user_id,
					event_id,
				},
				{
					status: "left",
				}
			);

			res.status(200).json({
				status: 200,
				message: "User has left event",
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}
}
