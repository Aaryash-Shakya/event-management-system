import React from "react";
import Event from "../components/Event";

const EventsPage = () => {
	return (
		<div className="sm:container mx-auto px-5">
			<h1 className="text-5xl ms-4">Events</h1>
			<div className="event-container d-flex flex-wrap">
				<Event />
				<Event />
				<Event />
				<Event />
				<Event />
				<Event />
				<Event />
				<Event />
				<Event />   
			</div>
		</div>
	);
};

export default EventsPage;
