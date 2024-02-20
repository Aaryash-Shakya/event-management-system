import { EventRepository } from "../repository/eventRepository";
import { Service } from "../services/utils";
import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../types/response";

export class EventController {
	static async getEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const events = await EventRepository.findAll({});
			res.status(200).json({
				status: 200,
				message: "All events retrieved",
				events,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async addEvent(req: Request, res: Response, next: NextFunction) {
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
			cost,
		} = req.body;

		const path = req.file.path.replace(/\\/g, "/");

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
			cost,
			banner: path,
		};
		try {
			const event = await EventRepository.create(eventData);
			console.log(event);
			res.status(200).json({
				status: 200,
				message: "Event created",
				event,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async getEvent(req: Request, res: Response, next: NextFunction) {
		const event_id = req.params.event_id;
		try {
			// test conditions
			const testEvent = await EventRepository.findOne({
				event_id: event_id,
			});

			// check if event exists
			if (!testEvent) {
				Service.createErrorAndThrow("Event not registered", 404); // event not found
			}

			res.status(200).json({
				status: 200,
				message: "Event fetched",
				event: testEvent,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	// ! ask: should i make a separate function for each field like: updateStatus, incrementCurrentParticipants, etc.?
	static async updateEvent(req: Request, res: Response, next: NextFunction) {
		const event_id = req.params.event_id;
		const {
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
		} = req.body;

		try {
			// test conditions
			const testEvent = await EventRepository.findOne({
				event_id: event_id,
			});

			// check if event exists
			if (!testEvent) {
				Service.createErrorAndThrow("Event not registered", 404); // event not found
			}

			const eventData: any = {};
			if (title) eventData.title = title;
			if (description) eventData.description = description;
			if (status) eventData.status = status;
			if (current_participants) eventData.maximum_participants = current_participants;
			if (maximum_participants) eventData.maximum_participants = maximum_participants;
			if (gathering_point) eventData.gathering_point = gathering_point;
			if (destination) eventData.destination = destination;
			if (start_date) eventData.start_date = start_date;
			if (duration) eventData.duration = duration;
			if (difficulty) eventData.difficulty = difficulty;

			const event = await EventRepository.update(
				{
					event_id,
				},
				eventData
			);
			res.status(200).json({
				status: 200,
				message: "Event updated",
				event,
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}

	static async deleteEvent(req: Request, res: Response, next: NextFunction) {
		const event_id = req.params.event_id;
		try {
			// test conditions
			const testEvent = await EventRepository.findOne({
				event_id: event_id,
			});

			// check if event exists
			if (!testEvent) {
				Service.createErrorAndThrow("Event not registered", 404); // event not found
			}

			await EventRepository.delete({
				event_id,
			});
			res.status(200).json({
				status: 200,
				message: "Event deleted",
			} as SuccessResponse);
		} catch (err) {
			next(err);
		}
	}
}
