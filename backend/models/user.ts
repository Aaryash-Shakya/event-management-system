const { Model } = require("sequelize");

interface UserAttributes {
	firstName: String;
	lastName: String;
	email: String;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		firstName!: String;
		lastName!: String;
		email!: String;
		static associate(models:any) {
			// define association here
		}
	}
	User.init(
		{
			firstName:{
				type: DataTypes.STRING,
				allowNull: false
			} ,
			lastName:{
				type: DataTypes.STRING,
				allowNull: false
			} ,
			email:{
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			} 
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
