import { Model } from "sequelize";
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
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			current_participants: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			maximum_participants: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			gathering_point: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			destination: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			start_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			duration: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.STRING,
				allowNull: false,
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
