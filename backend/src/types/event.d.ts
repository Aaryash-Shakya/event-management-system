export type EventModelType = {
	event_id?: number;
	title: string;
	description: string;
	status: "upcoming" | "completed" | "postponed" | "draft" | "cancelled";
	current_participants: number;
	maximum_participants: number;
	gathering_point: string;
	destination: string;
	start_date: Date;
	duration: string;
	difficulty: "Easy" | "Moderate" | "Challenging" | "Hard" | "Extreme";
	cost: number;
	banner: string;
	createdAt: Date;
	updatedAt: Date;
};
