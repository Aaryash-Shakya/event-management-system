import { Sequelize, db } from "../models";

export class TokenRepository {
	static async findAll(key: object) {
		return await db.TokenModel.findAll({
			where: { ...key },
		});
	}

	static async findOne(key: object) {
		let token = await db.TokenModel.findOne({
			where: { ...key },
		});
		if (token) {
			return token.dataValues;
		}
		return false;
	}

	static async create(tokenData: object) {
		let token = await db.TokenModel.create(tokenData);
		return token.toJSON();
	}

	static async deleteOne(key: object) {
		return await db.TokenModel.destroy({
			where: { ...key },
		});
	}

	static async update(key: object, newData: object) {
		let token = await db.TokenModel.update(
			{ ...newData },
			{
				where: { ...key },
				returning: true,
				plain: true,
			}
		);
		return token[1].dataValues;
	}
}
