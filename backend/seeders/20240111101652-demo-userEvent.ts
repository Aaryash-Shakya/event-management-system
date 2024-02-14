import { UserEventModelType } from "../src/types/userEvent";

const userEvents: UserEventModelType[] = [
	{
		user_id: 1,
		event_id: 1,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 2,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 3,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 4,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 5,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 6,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 7,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 8,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 9,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 10,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 1,
		event_id: 10,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 2,
		event_id: 1,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 2,
		event_id: 2,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 2,
		event_id: 7,
		payment_id: null,
		status: "paid",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 2,
		event_id: 8,
		payment_id: null,
		status: "pending",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		user_id: 2,
		event_id: 10,
		payment_id: null,
		status: "pending",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("UserEvents", userEvents, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("UserEvents", null, {});
	},
};
