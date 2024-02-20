import React from "react";
import { useNavigate } from "react-router-dom";

interface EventProps {
	key: number;
	item: EventData;
}

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
	updatedAt: string;
};

const Event: React.FC<EventProps> = props => {
	const navigate = useNavigate();
	const shortDescription =
		props.item.description.length > 50 ? props.item.description.substring(0, 50) + "..." : props.item.description;

	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 inline-block p-4">
			<div className="card card-compact bg-base-100 shadow-xl">
				<figure className="rounded-xl">
					<img
						src="../../public/photos/bagpack.jpg"
						className="hover:scale-110 ease-out duration-500"
						alt="Bagpack"
					/>
				</figure>
				<div className="card-body text-base-content">
					<h2 className="card-title">{props.item.title}</h2>
					<p className="description">{shortDescription}</p>
					<p>
						<div className="my-1 badge badge-outline badge-default">{props.item.difficulty}</div>
						&nbsp;&nbsp;
						<div className="my-1 badge badge-outline badge-default">{props.item.duration}</div>
						&nbsp;&nbsp;
						<div
							className={`my-1 badge 
								${props.item.status === "upcoming" && "badge-primary"}
								${props.item.status === "cancelled" && "badge-error"}
								${props.item.status === "completed" && "badge-ghost"}
								${props.item.status === "postponed" && "badge-neutral"}
								${props.item.status === "draft" && "badge-warning"}
							`}
						>
							{props.item.status}
						</div>
					</p>
					<div className="card-actions flex items-center justify-between">
						<span className="date">
							{new Date(props.item.start_date).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							})}
						</span>
						<button
							className="btn btn-primary"
							onClick={() => {
								navigate("/event-details/" + props.item.event_id, { state: props.item });
							}}
						>
							Learn More
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Event;
