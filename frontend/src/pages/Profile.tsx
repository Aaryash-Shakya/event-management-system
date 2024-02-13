import React, { useEffect, useState } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";

const Profile: React.FC = () => {
	const navigate = useNavigate();

	// get email from userStore
	const email = useUserStore.getState().email;

	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		type: "",
		createdAt: "",
	});
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`${serverUrl}/api/user/get-profile/${email}`, {
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
				// navigate("/");
				console.log(err);
			}
		};

		fetchUser();
	}, []);

	return (
		<>
			<div className="bg-base-200 py-5">
				<div className="container bg-base-100 max-w-4xl min-h-screen mx-auto rounded-lg overflow-hidden shadow-md">
					<div className="profile-header flex justify-center items-center mx-4 my-10">
						<div className="left md:w-1/5 w-full">
							<div className="w-24 mask mask-squircle">
								<img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
							</div>
						</div>
						<div className="right w-full md:w-3/5 flex flex-col">
							<h1 className="text-3xl text-base-content">{user.name}</h1>
							<p className="text-gray-700">{user.email}</p>
							<p className="text-gray-700">{user.phone}</p>
						</div>
					</div>
					<hr />
					<UserDashboard />
				</div>
			</div>
		</>
	);
};

export default Profile;
