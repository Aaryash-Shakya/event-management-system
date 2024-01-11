"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("UserEvents", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			event_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Events",
					key: "event_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			payment_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Payments",
					key: "payment_id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "payment not made",
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
		await queryInterface.dropTable("UserEvents");
	},
};
