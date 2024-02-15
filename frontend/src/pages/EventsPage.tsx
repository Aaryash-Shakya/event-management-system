import Event from "../components/Event";
import axios from "axios";
import { useState, useEffect } from "react";
import serverUrl from "../config";

type EventData = {
	createdAt: string;
	current_participants: number;
	description: string;
	destination: string;
	difficulty: string;
	duration: string;
	event_id: number;
	gathering_point: string;
	maximum_participants: number;
	start_date: string;
	status: string;
	title: string;
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

	const eventMapping = () => {
		return events.map((event: EventData, index: number) => <Event key={index} item={event} />);
	};

	return (
		<div className="sm:container mx-auto px-5">
			<h1 className="text-5xl ms-4">Events</h1>
			<div className="event-container d-flex flex-wrap">
				{eventMapping()}
			</div>
		</div>
	);
};

export default EventsPage;
