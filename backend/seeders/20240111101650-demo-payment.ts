// import { QueryInterface } from "sequelize";
// import { PaymentModelType } from "../src/types/payment";

const payments = [
	{
		amount: 100,
		mode: "cash",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		amount: 200,
		mode: "wallet",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		amount: 150,
		mode: "card",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		amount: 300,
		mode: "bank",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		amount: 320,
		mode: "cash",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Payments", payments, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Payments", null, {});
	},
};
