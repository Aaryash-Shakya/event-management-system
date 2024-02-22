import { useState } from "react";
import { EventData } from "../components/Event";
import axios from "axios";
import serverUrl from "../config";

const AddEvent = () => {
	const [newEvent, setNewEvent] = useState({} as EventData);

	const handleSubmit = () => {
		axios.post(`${serverUrl}/api/event/add-event`, newEvent, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
			},
		}).then(res => {
			console.log(res.data);
		}).catch(err => {
			console.log(err);
		});
	};

	return (
		<form className="form-control w-full items-start">
			<label className="form-control w-full max-w-lg" htmlFor="title">
				<div className="label">
					<span className="label-text font-semibold">Event Title</span>
				</div>
				<input
					type="text"
					id="title"
					placeholder="Event Title"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
					value={newEvent.title}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="description">
				<div className="label">
					<span className="label-text font-semibold">Event Description</span>
				</div>
				<input
					type="text"
					id="description"
					placeholder="Event Description"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
					value={newEvent.description}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="status">
				<div className="label">
					<span className="label-text font-semibold">Event Status</span>
				</div>
				<select
					id="status"
					className="input input-bordered w-full max-w-lg select"
					onChange={e => setNewEvent(prev => ({ ...prev, status: e.target.value }))}
					value={newEvent.status}
				>
					<option value="upcoming">Upcoming</option>
					<option value="completed">Completed</option>
					<option value="postponed">Postponed</option>
					<option value="draft">Draft</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="maximumParticipants">
				<div className="label">
					<span className="label-text font-semibold">Maximum Participants</span>
				</div>
				<input
					type="number"
					id="maximumParticipants"
					placeholder="Maximum Participants"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, maximum_participants: parseInt(e.target.value) }))}
					value={newEvent.maximum_participants}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="gatheringPoint">
				<div className="label">
					<span className="label-text font-semibold">Gathering Point</span>
				</div>
				<input
					type="text"
					id="gatheringPoint"
					placeholder="Gathering Point"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, gathering_point: e.target.value }))}
					value={newEvent.gathering_point}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="destination">
				<div className="label">
					<span className="label-text font-semibold">Event Destination</span>
				</div>
				<input
					type="text"
					id="destination"
					placeholder="Event Destination"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, destination: e.target.value }))}
					value={newEvent.destination}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="startDate">
				<div className="label">
					<span className="label-text font-semibold">Event Starting Date</span>
				</div>
				<input
					type="datetime-local"
					id="startDate"
					placeholder="Event Starting Date"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, start_date: e.target.value }))}
					value={newEvent.start_date}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="duration">
				<div className="label">
					<span className="label-text font-semibold">Event Duration</span>
				</div>
				<input
					type="text"
					id="duration"
					placeholder="Event Duration"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, duration: e.target.value }))}
					value={newEvent.duration}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="duration">
				<div className="label">
					<span className="label-text font-semibold">Event Duration</span>
				</div>
				<select
					id="duration"
					className="input input-bordered w-full max-w-lg select"
					onChange={e => setNewEvent(prev => ({ ...prev, duration: e.target.value }))}
					value={newEvent.duration}
				>
					<option value="Easy">Easy</option>
					<option value="Moderate">Moderate</option>
					<option value="Challenging">Challenging</option>
					<option value="Hard">Hard</option>
					<option value="Extreme">Extreme</option>
				</select>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="cost">
				<div className="label">
					<span className="label-text font-semibold">Participation Fee</span>
				</div>
				<input
					type="number"
					id="cost"
					placeholder="Participation Fee"
					className="input input-bordered w-full max-w-lg"
					onChange={e => setNewEvent(prev => ({ ...prev, cost: parseInt(e.target.value) }))}
					value={newEvent.cost}
				/>
			</label>
			<label className="form-control w-full max-w-lg" htmlFor="banner">
				<div className="label">
					<span className="label-text font-semibold">Event Banner</span>
				</div>
				<input
					type="file"
					id="banner"
					placeholder="Event Banner"
					className="input input-bordered w-full max-w-lg file-input"
					onChange={e => {
						console.log(e.target.files![0]);
					}}
				/>
			</label>
			<div onClick={handleSubmit} className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white">
				Add Event
			</div>
		</form>
	);
};

export default AddEvent;
