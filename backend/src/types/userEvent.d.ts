export type UserEventModelType = {
	user_id: number;
	event_id: number;
	payment_id: number;
	status: "paid" | "pending" | "left & refunded" | "left";
	createdAt: Date;
	updatedAt: Date;
};
