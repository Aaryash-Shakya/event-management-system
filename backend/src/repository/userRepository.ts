import { Sequelize, db } from "../models";

// NOTE this syntax supports intelisense
Sequelize.Model.update

export class UserRepository {
	static async findAll() {
		return await db.UserModel.findAll();
	}

	static async findOne(key) {
		let user = await db.UserModel.findOne({ 
            where: { ...key } 
        });
        if(user){
            return user.dataValues;
        }
        // NOTE dont use user.toJSON(), if user doesn't exist it throws instead, using .dataValues also cause error
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
        return user[1].dataValues;
	}
}
