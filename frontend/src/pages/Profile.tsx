import React, { useEffect, useState } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";
import axios from "axios";
import UserDashboard from "../components/UserDashboard";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
	// get userID from userStore
	const userId = useUserStore.getState().userId;
	const [user, setUser] = useState({
		name: "",
		email: "",
		gender: "",
		date_of_birth: "",
		phone: "",
		type: "",
		createdAt: "",
	});
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUser = async () => {
			try {
				if(userId === null){
					navigate("")
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

	const handleSignOut = () =>{
		localStorage.removeItem("jwt");
		localStorage.removeItem("userId");
		localStorage.removeItem("email");
		useUserStore.setState({isAuthenticated: false});
		useUserStore.setState({userId: null});
		useUserStore.setState({email: ""});
		navigate("/");
	}

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
							<div className="btn btn-warning absolute bottom-0 right-10" onClick={()=>handleSignOut()}>Sign Out</div>
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
