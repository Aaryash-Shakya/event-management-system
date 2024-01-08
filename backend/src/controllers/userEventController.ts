import { UserEventRepository } from "../repository/userEventRepository";

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
		try {
			res.status(200).json({ message: "joinEvent" });
		} catch (error) {
			next(error);
		}
	}
}
