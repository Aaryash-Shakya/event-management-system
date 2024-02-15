import { TokenRepository } from "../repository/tokenRepository";
import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../types/response";

export class TokenController {
	static async getTokens(req: Request, res: Response, next: NextFunction) {
		try {
			const tokens = await TokenRepository.findAll({});
			res.status(200).json({
				status: 200,
				message: "Tokens retrieved",
				tokens,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async getUserTokens(req: Request, res: Response, next: NextFunction) {
		const userId = req.params.userId;
		try {
			const tokens = await TokenRepository.findAll({ userId });
			res.status(200).json({
				status: 200,
				message: "Tokens retrieved for user",
				tokens,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}

	static async createToken(req: Request, res: Response, next: NextFunction) {
		const { purpose, value, expires_in, userId } = req.body;
		const tokenData = { purpose, value, expires_in, userId };
		try {
			const token = await TokenRepository.create(tokenData);
			res.status(200).json({
				status: 200,
				message: "Tokens created",
				token,
			} as SuccessResponse);
		} catch (error) {
			next(error);
		}
	}
}
