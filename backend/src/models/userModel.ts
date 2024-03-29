import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
	class UserModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 */
		static associate(models) {
			UserModel.hasMany(models.TokenModel, { foreignKey: "userId" });
			UserModel.hasMany(models.UserEventModel, { foreignKey: "user_id" });
		}
	}
	UserModel.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			date_of_birth: {
				type: DataTypes.DATE,
			},
			gender: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			phone: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
			},
			type: {
				type: DataTypes.STRING,
				defaultValue: "user",
			},
			email_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			social: {
				type: DataTypes.JSON,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			sequelize,
			timestamps: true,
			modelName: "UserModel",
			tableName: "Users",
		}
	);
	return UserModel;
};
