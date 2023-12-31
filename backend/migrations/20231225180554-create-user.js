"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name:{
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			email_verified: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			},
			verification_token: {
				type: Sequelize.INTEGER,
			},
			verification_token_time: {
				type: Sequelize.DATE,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password_reset_token: {
				type: Sequelize.INTEGER,
				defaultValue: -1,
			},
			password_reset_token_time: {
				type: Sequelize.DATE,
			},
			phone: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'admin',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user");
	},
};
