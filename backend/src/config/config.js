const { config } = require("dotenv");
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
console.log(process.env.NODE_ENV);
module.exports = {
	development: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		// port: DB_PORT,
		host: DB_HOST,
		dialect: "postgres",
		migrationStorageTableName: "sequelize_migrations",
		seederStorageTableName: "sequelize_seeds",
	},
	test: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		// port: DB_PORT,
		host: DB_HOST,
		dialect: "mysql",
		migrationStorageTableName: "sequelize_migrations",
		seederStorageTableName: "sequelize_seeds",
	},
	// production
};
