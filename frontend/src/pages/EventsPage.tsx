import Event from "../components/Event";
import axios from "axios";
import { useState, useEffect } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";

export type EventData = {
	createdAt: string;
	current_participants: number;
	description: string;
	destination: string;
	difficulty: "Easy" | "Moderate" | "Challenging" | "Hard" | "Extreme";
	duration: string;
	event_id: number;
	gathering_point: string;
	maximum_participants: number;
	start_date: string;
	status: "upcoming" | "completed" | "postponed" | "draft" | "cancelled";
	title: string;
	cost: number;
	banner: string;
	updatedAt: string;
};

const EventsPage: React.FC = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(`${serverUrl}/api/event/get-events`);
				setEvents(response.data.events);
			} catch (err) {
				console.log(err);
			}
		};
		fetchEvent();
	}, []);

	const eventMapping = (status : "upcoming" | "completed" | "postponed" | "draft" | "cancelled") => {
		return events.map((event: EventData, index: number) => {
			if (event.status === status)
				return <Event key={index} item={event} />;
		});
	};

	return (
		<div className="sm:container mx-auto px-5">
			<h1 className="text-5xl ms-4">Events</h1>
			<div className="event-container flex flex-wrap">
				{eventMapping("upcoming")}
				{eventMapping("completed")}
				{eventMapping("postponed")}
				{eventMapping("cancelled")}
				{useUserStore.getState().isAuthenticated === "admin" && eventMapping("draft")}
			</div>
		</div>
	);
};

export default EventsPage;
