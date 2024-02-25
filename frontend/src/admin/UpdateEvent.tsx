import { useEffect, useState } from "react";
import { EventData } from "../components/Event";
import axios from "axios";
import serverUrl from "../config";
import { useParams } from "react-router-dom";

const UpdateEvent: React.FC = () => {
	const event_id = useParams().event_id;
	const [updatedEvent, setUpdatedEvent] = useState({} as EventData);

	const fetchPreviousData = () => {
		axios.get(`${serverUrl}/api/event/get-event/${event_id}`).then(res => {
			setUpdatedEvent(res.data.event);
		});
	};

	useEffect(() => {
		fetchPreviousData();
	}, []);

	const handleSubmit = () => {
		axios
			.put(`${serverUrl}/api/event/update-event/${event_id}`, updatedEvent, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(res => {
				console.log(res.data);
				fetchPreviousData();
				scroll(0, 0);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="ms-24 mt-10 flex justify-center items-center">
				<form className="form-control items-start p-5 border rounded-lg shadow-lg bg-base-100 w-full max-w-xl">
					<label className="form-control w-full max-w-xl" htmlFor="title">
						<div className="label">
							<span className="label-text font-semibold">Event Title</span>
						</div>
						<input
							type="text"
							id="title"
							placeholder="Event Title"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, title: e.target.value }))}
							value={updatedEvent.title}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="description">
						<div className="label">
							<span className="label-text font-semibold">Event Description</span>
						</div>
						<input
							type="text"
							id="description"
							placeholder="Event Description"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, description: e.target.value }))}
							value={updatedEvent.description}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="status">
						<div className="label">
							<span className="label-text font-semibold">Event Status</span>
						</div>
						<select
							id="status"
							className="input input-bordered w-full max-w-xl select"
							onChange={e =>
								setUpdatedEvent(prev => ({
									...prev,
									status: e.target.value as
										| "upcoming"
										| "completed"
										| "postponed"
										| "draft"
										| "cancelled",
								}))
							}
							value={updatedEvent.status}
						>
							<option value="upcoming">Upcoming</option>
							<option value="completed">Completed</option>
							<option value="postponed">Postponed</option>
							<option value="draft">Draft</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="maximumParticipants">
						<div className="label">
							<span className="label-text font-semibold">Maximum Participants</span>
						</div>
						<input
							type="number"
							id="maximumParticipants"
							placeholder="Maximum Participants"
							className="input input-bordered w-full max-w-xl"
							onChange={e =>
								setUpdatedEvent(prev => ({ ...prev, maximum_participants: parseInt(e.target.value) }))
							}
							value={updatedEvent.maximum_participants}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="gatheringPoint">
						<div className="label">
							<span className="label-text font-semibold">Gathering Point</span>
						</div>
						<input
							type="text"
							id="gatheringPoint"
							placeholder="Gathering Point"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, gathering_point: e.target.value }))}
							value={updatedEvent.gathering_point}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="destination">
						<div className="label">
							<span className="label-text font-semibold">Event Destination</span>
						</div>
						<input
							type="text"
							id="destination"
							placeholder="Event Destination"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, destination: e.target.value }))}
							value={updatedEvent.destination}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="startDate">
						<div className="label">
							<span className="label-text font-semibold">Event Starting Date</span>
						</div>
						<input
							type="datetime-local"
							id="startDate"
							placeholder="Event Starting Date"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, start_date: e.target.value }))}
							value={new Date(updatedEvent.start_date).toISOString().slice(0, 16)}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="duration">
						<div className="label">
							<span className="label-text font-semibold">Event Duration</span>
						</div>
						<input
							type="text"
							id="duration"
							placeholder="Event Duration"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, duration: e.target.value }))}
							value={updatedEvent.duration}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="duration">
						<div className="label">
							<span className="label-text font-semibold">Event Difficulty</span>
						</div>
						<select
							id="duration"
							className="input input-bordered w-full max-w-xl select"
							onChange={e =>
								setUpdatedEvent(prev => ({
									...prev,
									difficulty: e.target.value as
										| "Easy"
										| "Moderate"
										| "Challenging"
										| "Hard"
										| "Extreme",
								}))
							}
							value={updatedEvent.difficulty}
						>
							<option value="Easy">Easy</option>
							<option value="Moderate">Moderate</option>
							<option value="Challenging">Challenging</option>
							<option value="Hard">Hard</option>
							<option value="Extreme">Extreme</option>
						</select>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="cost">
						<div className="label">
							<span className="label-text font-semibold">Participation Fee</span>
						</div>
						<input
							type="number"
							id="cost"
							placeholder="Participation Fee"
							className="input input-bordered w-full max-w-xl"
							onChange={e => setUpdatedEvent(prev => ({ ...prev, cost: parseInt(e.target.value) }))}
							value={updatedEvent.cost}
						/>
					</label>
					<label className="form-control w-full max-w-xl" htmlFor="banner">
						<div className="label">
							<span className="label-text font-semibold">Event Banner</span>
						</div>
						<img
							src={`${serverUrl}/${updatedEvent.banner}`}
							alt={updatedEvent.title}
							className="max-w-xl w-full object-cover"
						/>
						<input
							type="file"
							id="banner"
							placeholder="Choose another Banner"
							className="input input-bordered w-full max-w-xl file-input"
							onChange={e => {
								setUpdatedEvent(prev => ({ ...prev, banner: e.target.files![0] }));
								console.log(e.target.files![0]);
							}}
						/>
					</label>
					<div
						onClick={handleSubmit}
						className="btn btn-primary btn-circle w-full max-w-xl mt-5 text-lg text-white"
					>
						Update Event
					</div>
				</form>
			</div>
		</>
	);
};

export default UpdateEvent;
