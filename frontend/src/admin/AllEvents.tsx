import React, { useEffect, useState } from "react";
import { EventData } from "../components/Event";
import axios from "axios";
import serverUrl from "../config";
import { Link } from "react-router-dom";

const AllEvents: React.FC = () => {
	const [allEvents, setAllEvents] = useState([{} as EventData]);

	const fetchEvents = () => {
		axios
			.get(`${serverUrl}/api/event/get-events`)
			.then(res => {
				setAllEvents(res.data.events);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const handleDelete = (id: number) => {
		if (!confirm("Are you sure you want to delete this event?")) {
			return;
		}
		axios
			.delete(`${serverUrl}/api/event/delete-event/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(res => {
				console.log(res.data);
				fetchEvents();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const mapRows = () => {
		return allEvents.map((event, index) => {
			return (
				<tr key={index}>
					<th>{index + 1}</th>
					<td className="font-bold">{event.title}</td>
					<td>{event.status}</td>
					<td>
						{new Date(event.start_date).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
							hour12: true,
						})}
					</td>
					<td>
						<Link to={`/admin/update-event/${event.event_id}`} className="btn btn-sm btn-primary">
							Edit
						</Link>
					</td>
					<td>
						<button className="btn btn-sm btn-error" onClick={() => handleDelete(event.event_id)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});
	};
	return (
		<>
			<div className="md:container mx-auto mt-10 ps-20">
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr className="font-bold text-lg text-black">
								<th></th>
								<th>Name</th>
								<th>Status</th>
								<th>Starting Date</th>
								<th>Actions</th>
								<th></th>
							</tr>
						</thead>
						<tbody>{mapRows()}</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default AllEvents;
