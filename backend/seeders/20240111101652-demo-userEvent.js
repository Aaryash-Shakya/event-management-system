"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"UserEvents",
			[
				{
					user_id: 1,
					event_id: 1,
					payment_id: 1,
					status: "payment made",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 1,
					event_id: 2,
					payment_id: 2,
					status: "payment made",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 1,
					event_id: 3,
					payment_id: 3,
					status: "payment made",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 2,
					event_id: 2,
					status: "payment not made",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 3,
					event_id: 3,
					status: "payment not made",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UserEvents", null, {});
	},
};
