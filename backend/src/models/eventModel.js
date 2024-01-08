"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class EventModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			EventModel.hasMany(models.UserEventModel, { foreignKey: "event_id" });
		}
	}
	EventModel.init(
		{
			event_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			title: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			description: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			status: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			current_participants: {
				type: DataTypes.INTEGER,
				NotNull: true,
				defaultValue: 0,
			},
			maximum_participants: {
				type: DataTypes.INTEGER,
				NotNull: true,
			},
			gathering_point: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			destination: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			start_date: {
				type: DataTypes.DATE,
				NotNull: true,
			},
			duration: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			difficulty: {
				type: DataTypes.STRING,
				NotNull: true,
			},
		},
		{
			timestamps: true,
			sequelize,
			modelName: "EventModel",
			tableName: "Events",
		}
	);
	return EventModel;
};
