import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
	class TokenModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// TokenModel.belongsTo(models.UserModel, { foreignKey: 'userId' });
		}
	}
	TokenModel.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			purpose: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			value: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			expires_in: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
		},
		{
			timestamps: true,
			sequelize,
			modelName: "TokenModel",
			tableName: "Tokens",
		}
	);
	return TokenModel;
};
