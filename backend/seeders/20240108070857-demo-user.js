"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					name: "Aaryash",
					date_of_birth: "2003-02-08",
					gender: "Male",
					email: "aaryash@example.com",
					phone: "1234567890",
					password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
					type: "admin",
					email_verified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User 1",
					date_of_birth: "2000-01-01",
					gender: "Male",
					email: "user1@example.com",
					phone: "1111111111",
					password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
					type: "user",
					email_verified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "User 2",
					date_of_birth: "2000-01-01",
					gender: "Female",
					email: "user2@example.com",
					phone: "2222222222",
					password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
					type: "user",
					email_verified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
