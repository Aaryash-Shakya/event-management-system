import { EventModelType } from "../src/types/event";

/** @type {import('sequelize-cli').Migration} */

const events: EventModelType[] = [
	{
		title: "Annapurna Base Camp Trek",
		description:
			"Embark on a breathtaking journey to the heart of the Annapurna region, surrounded by towering peaks and pristine landscapes.",
		status: "upcoming",
		current_participants: 15,
		maximum_participants: 25,
		gathering_point: "Nayapul",
		destination: "Annapurna Base Camp",
		start_date: new Date("2024-03-10T08:00:00"),
		duration: "7 days",
		difficulty: "Challenging",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Langtang Valley Exploration",
		description:
			"Discover the unique culture and breathtaking scenery of Langtang Valley in this immersive trekking experience.",
		status: "upcoming",
		current_participants: 8,
		maximum_participants: 15,
		gathering_point: "Syabrubesi",
		destination: "Kyanjin Gompa",
		start_date: new Date("2024-04-05T09:00:00"),
		duration: "5 days",
		difficulty: "Moderate",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Gosaikunda Lake Adventure",
		description:
			"Embark on a mystical journey to the sacred Gosaikunda Lake, surrounded by pristine alpine landscapes and towering peaks.",
		status: "postponed",
		current_participants: 12,
		maximum_participants: 20,
		gathering_point: "Dhunche",
		destination: "Gosaikunda Lake",
		start_date: new Date("2024-05-20T07:30:00"),
		duration: "3 days",
		difficulty: "Hard",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Everest Base Camp Trek",
		description:
			"Challenge yourself with the iconic trek to Everest Base Camp, experiencing the grandeur of the world's highest peak.",
		status: "completed",
		current_participants: 18,
		maximum_participants: 30,
		gathering_point: "Lukla",
		destination: "Everest Base Camp",
		start_date: new Date("2024-01-15T06:00:00"),
		duration: "12 days",
		difficulty: "Extreme",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Mardi Himal Trek",
		description:
			"Experience the serenity of Mardi Himal in this off-the-beaten-path trek, offering panoramic views of the Annapurna and Machapuchare ranges.",
		status: "cancelled",
		current_participants: 10,
		maximum_participants: 18,
		gathering_point: "Kande",
		destination: "Mardi Himal Base Camp",
		start_date: new Date("2024-07-08T07:30:00"),
		duration: "6 days",
		difficulty: "Moderate",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Manaslu Circuit Expedition",
		description:
			"Embark on a challenging circuit around the majestic Manaslu, surrounded by diverse landscapes and rich cultural heritage.",
		status: "upcoming",
		current_participants: 14,
		maximum_participants: 25,
		gathering_point: "Seti Khola",
		destination: "Manaslu Circuit",
		start_date: new Date("2024-08-02T08:00:00"),
		duration: "14 days",
		difficulty: "Challenging",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Upper Mustang Exploration",
		description:
			"Uncover the hidden treasures of Upper Mustang, with its ancient caves, monasteries, and unique Tibetan-influenced culture.",
		status: "completed",
		current_participants: 7,
		maximum_participants: 12,
		gathering_point: "Jomsom",
		destination: "Lo Manthang",
		start_date: new Date("2024-09-18T09:30:00"),
		duration: "10 days",
		difficulty: "Moderate",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Dhaulagiri Base Camp Trek",
		description:
			"Embark on an adventurous journey to the base camp of Dhaulagiri, the seventh-highest mountain in the world.",
		status: "upcoming",
		current_participants: 9,
		maximum_participants: 16,
		gathering_point: "Beni",
		destination: "Dhaulagiri Base Camp",
		start_date: new Date("2024-10-12T07:00:00"),
		duration: "15 days",
		difficulty: "Extreme",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Ghorepani Poon Hill Trek",
		description:
			"Enjoy a relatively short trek to Poon Hill, offering stunning sunrise views of the Annapurna and Dhaulagiri mountain ranges.",
		status: "upcoming",
		current_participants: 12,
		maximum_participants: 20,
		gathering_point: "Nayapul",
		destination: "Poon Hill",
		start_date: new Date("2024-11-05T06:30:00"),
		duration: "4 days",
		difficulty: "Easy",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		title: "Kanchenjunga Base Camp Expedition",
		description:
			"Embark on a remote and challenging trek to the base camp of Kanchenjunga, the third-highest mountain in the world.",
		status: "draft",
		current_participants: 6,
		maximum_participants: 10,
		gathering_point: "Taplejung",
		destination: "Kanchenjunga Base Camp",
		start_date: new Date("2024-12-01T08:00:00"),
		duration: "20 days",
		difficulty: "Challenging",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Events", events, {});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Events", null, {});
	},
};
