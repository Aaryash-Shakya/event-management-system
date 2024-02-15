import axios from "axios";
import React, { useEffect, useState } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";

type UserEvent = {
	id: number;
	user_id: number;
	event_id: number;
	payment_id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	EventModel: {
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
		createdAt: Date;
		updatedAt: Date;
	};
};

const UserHistory: React.FC = () => {
	const navigate = useNavigate();
	const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const res = await axios.post(
				`${serverUrl}/api/user-event/get-events-by-participant`,
				{
					user_id: useUserStore.getState().userId,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (res.status !== 200) {
				setErrorMessage("Error fetching events");
				throw new Error("Error fetching events");
			}

			setUserEvents(res.data.data);
			console.log(userEvents);
		} catch (err) {
			console.log(err);
		}
	};

	const mapEventRows = (userEvents: UserEvent[]) => {
		return userEvents.map((event, key) => {
			return (
				<tr className="hover:backdrop-brightness-95" key={event.id}>
					<td>
						<div className="font-bold">{key + 1}</div>
					</td>
					<td>
						<div className="font-bold">{event.EventModel.title}</div>
					</td>
					<td>
						{event.EventModel.destination}
						<br />
						<span className="badge badge-ghost badge-sm">
							{new Date(event.EventModel.start_date).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
								hour12: true,
							})}
						</span>
					</td>
					<td>
						<div className="flex items-center gap-3">
							<div>
								<div className="font-bold">{event.status}</div>
								<div className="text-sm opacity-50">{event.status == "left" ? "refunding":"cash"}</div>
							</div>
						</div>
					</td>
					<td>
						<button
							className="btn btn-primary btn-sm me-4"
							onClick={() => {
								navigate(`/event-details/${event.event_id}`);
							}}
						>
							details
						</button>
						<button
							className={`btn btn-error btn-sm ${event.status === "left" ? "btn-disabled" : ""}`}
							onClick={() => handleLeave(event.event_id, event.user_id)}
						>
							{event.status === "left" ? "left" : "leave"}
						</button>
					</td>
				</tr>
			);
		});
	};

	const handleLeave = (event_id: number, user_id: number) => {
		axios
			.delete(`${serverUrl}/api/user-event/leave-event`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					"Content-Type": "application/json",
				},
				data: {
					user_id: user_id,
					event_id: event_id,
				},
			})
			.then(res => {
				if (res.status !== 200) {
					setErrorMessage("Error leaving event");
					throw new Error("Error leaving event");
				}

				setSuccessMessage("You have left the event");
				setTimeout(() => {
					setSuccessMessage("");
				}, 3000);
				console.log(res);
				// reload table
				fetchEvents();
			})
			.catch(err => {
				setErrorMessage("Error leaving event");
				console.log(err);
			});
	};

	const showErrorMessage = () => {
		return errorMessage !== "" ? (
			<>
				<div role="alert" className="alert alert-error">
					<GoXCircleFill />
					<span>{errorMessage}</span>
				</div>
			</>
		) : (
			""
		);
	};

	const showSuccessMessage = () => {
		return successMessage !== "" ? (
			<>
				<div role="alert" className="alert alert-success">
					<FaCheckCircle />
					<span>{successMessage}</span>
				</div>
			</>
		) : (
			""
		);
	};
	return (
		<>
			<div className="w-full p-4">
				<div className="overflow-x-auto">
					{showSuccessMessage()}
					{showErrorMessage()}
					<table className="table">
						{/* head */}
						<thead className="text-lg text-base-content">
							<tr>
								<th>S.N.</th>
								<th>Event Name</th>
								<th>Destination</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>{mapEventRows(userEvents)}</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default UserHistory;
