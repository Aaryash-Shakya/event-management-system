import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
	class UserModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserModel.hasMany(models.TokenModel, { foreignKey: "userId" });
			// UserModel.hasMany(models.TokenModel);
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
				notNull: true,
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
			type: {
				type: DataTypes.STRING,
				defaultValue: "user",
			},
			email_verified: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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