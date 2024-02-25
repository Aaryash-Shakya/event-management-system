import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { isAuthenticated } from "../auth/authIndex";
import axios from "axios";
import serverUrl from "../config";
import { EventData } from "./EventsPage";
import Event from "../components/Event";

const HomePage: React.FC = () => {
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
		const upcomingEvents = events.filter((event: EventData) => event.status === "upcoming");
		return upcomingEvents.map((event: EventData, index: number) => <Event key={index} item={event} />);
	};

	isAuthenticated();
	return (
		<>
			<Header />
			<div className="md:container md:mx-auto">
				<h1 className="text-3xl font-bold border-b-2">Popular Upcoming Events</h1>
				{eventMapping()}
			</div>
		</>
	);
};

export default HomePage;
