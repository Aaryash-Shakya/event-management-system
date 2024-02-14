import { QueryInterface } from "sequelize";
import { PaymentModelType } from "../src/types/payment";

const payments: PaymentModelType[] = [
	{
		payment_id: 1,
		amount: 100,
		mode: "cash",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		payment_id: 2,
		amount: 200,
		mode: "wallet",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		payment_id: 3,
		amount: 150,
		mode: "card",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		payment_id: 4,
		amount: 300,
		mode: "bank",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		payment_id: 5,
		amount: 320,
		mode: "cash",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

module.exports = {
	async up(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.bulkInsert("Payments", payments, {});
	},

	async down(queryInterface: QueryInterface, Sequelize) {
		await queryInterface.bulkDelete("Payments", null, {});
	},
};
