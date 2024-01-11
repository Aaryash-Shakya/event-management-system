"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserEventModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	UserEventModel.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
			event_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Events",
					key: "event_id",
				},
			},
			payment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Payments",
					key: "payment_id",
				},
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "payment not made",
			},
		},
		{
			sequelize,
			modelName: "UserEventModel",
			tableName: "UserEvents",
		}
	);
	return UserEventModel;
};
