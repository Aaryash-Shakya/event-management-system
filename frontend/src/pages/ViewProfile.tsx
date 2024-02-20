import axios from "axios";
import React, { useEffect, useState } from "react";
import serverUrl from "../config";
import { useParams } from "react-router-dom";
import UserHistory from "../components/UserHistory";
import { IoSubway } from "react-icons/io5";
import { isAuthenticated } from "../auth/authIndex";
import { useUserStore } from "../store/store";

const ViewProfile: React.FC = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		gender: "",
		date_of_birth: "",
		phone: "",
		type: "",
		createdAt: "",
	});
	const param = useParams();
	const userId = param.userId;
	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (userId === null) {
					console.log("user not found");
				}
				const res = await axios.get(`${serverUrl}/api/user/get-profile/${userId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
						"Content-Type": "application/json",
					},
				});
				if (res.status !== 200) {
					throw new Error("Error fetching user");
				}
				setUser(res.data.profile);
			} catch (err) {
				console.log(err);
			}
		};

		fetchUser();
	}, []);
	return (
		<>
			<div className="bg-base-200 py-5">
				<div className="container bg-base-100 max-w-4xl min-h-screen mx-auto rounded-lg overflow-hidden shadow-md">
					<div className="profile-header flex justify-center items-center mx-4 my-10 relative">
						<div className="left md:w-1/5 w-full flex items-center justify-center">
							<div className="w-24 mask mask-squircle">
								<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						</div>
						<div className="right w-full md:w-3/5 flex flex-col">
							<h1 className="text-3xl text-base-content">{user.name}</h1>
							<p className="text-gray-700">{user.email}</p>
							<p className="text-gray-700">{user.phone && user.phone}</p>
							<p className="text-gray-700">{user.gender && user.gender}</p>
						</div>
					</div>
					<hr />
                    {useUserStore.getState().isAuthenticated === "admin" && (
                        <UserHistory />
                    )}
				</div>
			</div>
		</>
	);
};

export default ViewProfile;
