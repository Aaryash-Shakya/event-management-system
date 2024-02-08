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

const Event: React.FC<EventProps> = props => {
	const navigate = useNavigate();

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
				<div className="card-body text-primary">
					<h2 className="card-title">{props.item.title}</h2>
					<p className="description">{props.item.description}</p>
					<p>
						<span className="difficulty">{props.item.difficulty}</span> .{" "}
						<span className="duration">{props.item.duration}</span>
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
							Join Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Event;
