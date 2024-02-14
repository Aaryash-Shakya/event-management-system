const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class PaymentModel extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			PaymentModel.hasMany(models.UserEventModel, { foreignKey: "payment_id" });
		}
	}
	PaymentModel.init(
		{
			payment_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
		},
		{
			timestamps: true,
			sequelize,
			modelName: "PaymentModel",
			tableName: "Payments",
		}
	);
	return PaymentModel;
};
