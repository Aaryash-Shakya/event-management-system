"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Events", {
			event_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			description: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			status: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			current_participants: {
				type: Sequelize.INTEGER,
				NotNull: true,
				defaultValue: 0,
			},
			maximum_participants: {
				type: Sequelize.INTEGER,
				NotNull: true,
			},
			gathering_point: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			destination: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			start_date: {
				type: Sequelize.DATE,
				NotNull: true,
			},
			duration: {
				type: Sequelize.STRING,
				NotNull: true,
			},
			difficulty: {
				type: Sequelize.STRING,
				NotNull: true,
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
		await queryInterface.dropTable("Events");
	},
};
