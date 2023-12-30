import { Sequelize, db } from "../models";

// NOTE this syntax supports intelisense
Sequelize.Model.update

export class UserRepository {
	static async findAll() {
		return await db.UserModel.findAll();
	}

	static async findOne(userEmail: String) {
		return await db.UserModel.findOne({ 
            where: { email: userEmail } 
        });
	}

	static async create(userData) {
		let user = await db.UserModel.create(userData);
        return user.toJSON();
	}
	
    static async update(key, newData) {
		let user = await db.UserModel.update(
            {...newData},
            {
                where: {...key},

                // ref: https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
                returning: true,
                plain: true,
            }
        );
        console.log(user[1].dataValues);
        return user[1].dataValues;
	}
}
