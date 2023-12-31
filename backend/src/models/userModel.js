import { Model,DataTypes } from "sequelize";
module.exports = (sequelize) => {
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
			name:{
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			email_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			verification_token: {
				type: DataTypes.INTEGER,
			},
			verification_token_time: {
				type: DataTypes.DATE,
			},
			password: {
				type: DataTypes.STRING,
			},
			password_reset_token: {
				type: DataTypes.INTEGER,
				defaultValue: -1,
			},
			password_reset_token_time: {
				type: DataTypes.DATE,
			},
			phone: {
				type: DataTypes.STRING,
			},
			type: {
				type: DataTypes.STRING,
				defaultValue: 'admin',
			},	
		},
		{
			sequelize,
			timestamps: true,
			modelName: "UserModel",
			tableName: "user",
		}
	);
	return UserModel;
};