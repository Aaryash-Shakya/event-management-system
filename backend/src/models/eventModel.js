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
			// define association here
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
				type: DataTypes.StrING,
				NotNull: true,
			},
			status:{
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
			start_date: {
				type: DataTypes.DATE,
				NotNull: true,
			},
			duration: {
				type: DataTypes.DATE,
				NotNull: true,
			},
			difficulty: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			starting_location: {
				type: DataTypes.STRING,
				NotNull: true,
			},
			ending_location: {
				type: DataTypes.STRING,
				NotNull: true,
			},
		},
		{
			sequelize,
			modelName: "EventModel",
			tableName: "Events",
		}
	);
	return EventModel;
};
