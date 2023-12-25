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
			name: DataTypes.STRING,
			email: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "UserModel",
			tableName: "user",
		}
	);
	return UserModel;
};