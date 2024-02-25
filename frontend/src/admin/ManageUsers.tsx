import React, { useEffect, useState } from "react";
import axios from "axios";
import serverUrl from "../config";
import { Link } from "react-router-dom";
import { UserModelType } from "../types/response";

const ManageUsers: React.FC = () => {
	const [allUsers, setAllUsers] = useState([{} as UserModelType]);

	const fetchEvents = () => {
		axios
			.get(`${serverUrl}/api/user/get-users`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(res => {
				setAllUsers(res.data.users);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const mapRows = () => {
		return allUsers.map((user, index) => {
			return (
				<tr key={index}>
					<th>{index + 1}</th>
					<td className="font-bold">{user.name}</td>
					<td>{user.email}</td>
					<td>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
							hour12: true,
						})}
					</td>
					<td>
						<Link to={`/view-profile/${user.id}`} className="btn btn-sm btn-primary">
							Profile
						</Link>
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
								<th>Email</th>
								<th>Joined At</th>
								<th>Profile</th>
							</tr>
						</thead>
						<tbody>{mapRows()}</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default ManageUsers;
