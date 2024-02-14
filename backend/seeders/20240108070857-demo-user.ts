import { QueryInterface } from "sequelize";
import { UserModelType } from "../src/types/user";

const users: UserModelType[] = [
	{
		name: "Aaryash Shakya",
		date_of_birth: "2003-02-08",
		gender: "Male",
		email: "aaryash@gmail.com",
		phone: "9861445590",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "admin",
		email_verified: true,
		social: {
			facebook: 'https://www.facebook.com/profile.php?id=100010462128049',
			instagram: 'https://www.instagram.com/aaryashshakya_',
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Niraj Ghimire",
		date_of_birth: "1990-01-04",
		gender: "Male",
		email: "niraj@gmail.com",
		phone: "9841121212",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "admin",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Kaushal Kishor Mishra",
		date_of_birth: "2000-07-05",
		gender: "Male",
		email: "kaushal@gmail.com",
		phone: "9841131313",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "admin",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Shiraj Shrestha",
		date_of_birth: "1999-01-01",
		gender: "Male",
		email: "shiraj@gmail.com",
		phone: "9841454545",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "user",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Asmita Shrestha",
		date_of_birth: "1995-04-21",
		gender: "Female",
		email: "asmita@gmail.com",
		phone: "9841565656",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "user",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Ronish Magar",
		date_of_birth: "1995-07-12",
		gender: "Male",
		email: "ronish@gmail.com",
		phone: "9841787878",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "user",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		name: "Prabin Rijal",
		date_of_birth: "2001-02-02",
		gender: "Male",
		email: "prabin@gmail.com",
		phone: "9841363636",
		password: "$2b$10$vLmMFY26MOcP11vk5sArt.vMhbkhCeemZHZCiMtVwYar0XWvEHVuC",
		type: "user",
		email_verified: true,
		social: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

module.exports = {
	async up(queryInterface:QueryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", users, {});
	},

	async down(queryInterface: QueryInterface, Sequelize) {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
