import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
	id: Number;
	email: String;
	password: String;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
	public id: number;
	public email: string;
	public password: string;

	// public readonly createdAt!: Date;
	// public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
	UserModel.init(
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING(45),
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING(255),
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: "users",
			modelName: "User",
		}
	);

	return UserModel;
}
