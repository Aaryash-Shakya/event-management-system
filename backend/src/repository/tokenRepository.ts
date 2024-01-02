import { Sequelize, db } from "../models";

export class TokenRepository {
	static async findAll() {
		return await db.TokenModel.findAll();
	}

	static async findOne(key: object) {
		let token = await db.TokenModel.findOne({
			where: { ...key },
		});
		if (token) {
			return token.dataValues;
		}
	}

	static async create(tokenData: object) {
		let token = await db.TokenModel.create(tokenData);
		return token.toJSON();
	}
}
