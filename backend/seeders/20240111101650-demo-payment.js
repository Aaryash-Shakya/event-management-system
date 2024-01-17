"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Payments",
			[
				{
					payment_id: 1,
					amount: 100,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					payment_id: 2,
					amount: 200,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					payment_id: 3,
					amount: 300,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					payment_id: 4,
					amount: 500,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Payments", null, {});
	},
};
