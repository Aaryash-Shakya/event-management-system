import axios from "axios";
import React, { useEffect, useState } from "react";
import serverUrl from "../config";
import { Link } from "react-router-dom";

type Participant = {
	id: number;
	user_id: number;
	event_id: number;
	payment_id: null | number;
	status: string;
	createdAt: string;
	updatedAt: string;
	UserModel: UserModel;
};

type UserModel = {
	id: number;
	name: string;
	date_of_birth: string;
	gender: string;
	email: string;
	phone: string;
	password: string;
	type: string;
	email_verified: boolean;
	social: null | string;
	createdAt: string;
	updatedAt: string;
};

const EventParticipants: React.FC<{ eventId: number }> = ({ eventId }) => {
	const [participants, setParticipants] = useState<Participant[]>([]);
	useEffect(() => {
		fetchParticipants();
	}, []);

	const fetchParticipants = () => {
		axios
			.post(`${serverUrl}/api/user-event/get-participants-by-event`, {
				event_id: eventId,
			})
			.then(res => {
				setParticipants(res.data.data);
			})
			.catch(err => console.log(err));
	};
	const mapParticipants = (users: Participant[]) => {
		if (!Array.isArray(users)) return;
		return users.map((user, index: number) => {
			return (
				<tr key={index}>
					<th>{index + 1}</th>
					<td>{user.UserModel.name}</td>
					<td>{user.UserModel.email}</td>
					<td>
						<Link className="btn btn-primary" to={`/user/${user.user_id}`}>
							View Profile
						</Link>
					</td>
				</tr>
			);
		});
	};

	return (
		<>
			<div className="overflow-x-auto w-max-xl mx-auto p-4">
				<table className="table">
					<thead className="text-lg text-base-content">
						<tr>
							{/* empty <th> to fix spacing for num */}
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Profile</th>
						</tr>
					</thead>
					<tbody>{mapParticipants(participants)}</tbody>
				</table>
			</div>
		</>
	);
};

export default EventParticipants;
