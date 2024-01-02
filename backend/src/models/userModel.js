import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
	class UserModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
			username:{
				type: DataTypes.STRING,
				unique: true,
				notNull: true,
			},
			first_name: {
				type: DataTypes.STRING,
				notNull: true,
			},
			last_name: {
				type: DataTypes.STRING,
			},
			date_of_birth: {
				type: DataTypes.DATE,
			},
			gender:{
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
			email_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			email_verification_token: {
				type: DataTypes.INTEGER,
			},
			email_verification_token_time: {
				type: DataTypes.DATE,
			},
			password_reset_token: {
				type: DataTypes.INTEGER,
				defaultValue: -1,
			},
			password_reset_token_time: {
				type: DataTypes.DATE,
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