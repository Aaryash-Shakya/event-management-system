"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING,
				unique: true,
				notNull: true,
			},
			first_name: {
				type: Sequelize.STRING,
				notNull: true,
			},
			last_name: {
				type: Sequelize.STRING,
			},
			date_of_birth: {
				type: Sequelize.DATE,
			},
			gender: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			phone: {
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			email_verified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			email_verification_token: {
				type: Sequelize.INTEGER,
			},
			email_verification_token_time: {
				type: Sequelize.DATE,
			},
			password_reset_token: {
				type: Sequelize.INTEGER,
				defaultValue: -1,
			},
			password_reset_token_time: {
				type: Sequelize.DATE,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
