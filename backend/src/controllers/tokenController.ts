import { TokenRepository } from "../repository/tokenRepository";

export class TokenController{
    static async getTokens(req, res, next) {
        try {
            const tokens = await TokenRepository.findAll({});
            res.status(200).json(tokens);
        } catch (error) {
            next(error);
        }
    }

    static async getUserTokens(req, res, next) {
        const userId = req.params.userId;
        try {
            const tokens = await TokenRepository.findAll({ userId });
            res.status(200).json(tokens);
        } catch (error) {
            next(error);
        }
    }

    static async createToken(req, res, next) {
        const { purpose, value, expires_in, userId } = req.body;
        const tokenData = { purpose, value, expires_in, userId };
        try {
            const token = await TokenRepository.create(tokenData);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    }
}