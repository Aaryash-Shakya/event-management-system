"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Events",
			[
				{
					title: "Shivapuri Hiking",
					description: "This is a sample event to hike Shivapuri",
					status: "Upcomming",
					current_participants: 10,
					maximum_participants: 20,
					gathering_point: "Balaju Bus Park",
					destination: "Shivapuri Gumba",
					start_date: new Date(),
					duration: "2 hours",
					difficulty: "Medium",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Sagarmatha College",
					description: "This is a sample event to walk to Sagarmatha College",
					status: "Completed",
					current_participants: 11,
					maximum_participants: 40,
					gathering_point: "Naxal",
					destination: "Sanepa",
					start_date: new Date(),
					duration: "1 hour",
					difficulty: "Medium",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: "Chandagiri Hiking",
					description: "This is a sample event to hike upto Chandagiri",
					status: "Draft",
					current_participants: 22,
					maximum_participants: 30,
					gathering_point: "Balkhu",
					destination: "Chandagiri Temple",
					start_date: new Date(),
					duration: "9 hours",
					difficulty: "Hard",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Events", null, {});
	},
};
