import axios from "axios";
import { useEffect, useState } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";
import { GoXCircleFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
	const userId = useUserStore.getState().userId;

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [initialData, setInitialData] = useState<{
		name: string;
		email: string;
		phone: string;
		gender: string;
		type: "admin" | "user";
	}>({
		name: "",
		email: "",
		phone: "",
		gender: "",
		type: "user",
	});
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [emailInfo, setEmailInfo] = useState<string>("");
	const navigate = useNavigate();

	const fetchInitialData = async () => {
		const res = await axios.get(`${serverUrl}/api/user/get-profile/${userId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				"Content-Type": "application/json",
			},
		});
		if (res.status !== 200) {
			setErrorMessage("Error fetching user");
			throw new Error("Error fetching user");
		}
		setInitialData({
			name: res.data.profile.name,
			email: res.data.profile.email,
			phone: res.data.profile.phone,
			gender: res.data.profile.gender,
			type: res.data.profile.type,
		});
		setName(res.data.profile.name);
		setEmail(res.data.profile.email);
		setPhone(res.data.profile.phone);
		setGender(res.data.profile.gender);
		setType(res.data.profile.type);
	};

	const handleUpdate = () => {
		const updatedData = {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			type: type,
		};
		axios
			.patch(`${serverUrl}/api/user/update-profile/`, updatedData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			})
			.then(() => {
				setSuccessMessage("Profile updated successfully");
				setTimeout(() => {
					if (email !== initialData.email) {
						navigate("/verify-email");
					} else {
						window.location.reload();
					}
				}, 1000);
			})
			.catch(err => {
				setErrorMessage("Error updating profile");
				console.log(err);
			});
	};

	useEffect(() => {
		fetchInitialData();
	}, []);

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
			<div className="bg-opacity-90 bg-base-100 rounded-xl flex-col mx-auto lg:p-10 md:px-7 px-4 py-10 gap-5 w-full max-w-xl">
				<p className="text-3xl font-bold text-center">Update your Profile</p>
				<p className="text-lg text-center">Keep your information current and make your profile shine!</p>

				{/* show message */}
				{showErrorMessage()}
				{showSuccessMessage()}

				<form className="form-control w-full items-start">
					<label className="form-control w-full max-w-lg" htmlFor="name">
						<div className="label">
							<span className="label-text font-semibold">Name</span>
						</div>
						<input
							type="text"
							id="name"
							placeholder="Name"
							className={`input input-bordered w-full max-w-lg ${
								name === initialData.name ? "" : "input-success"
							}`}
							onChange={e => setName(e.target.value)}
							value={name}
						/>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="email">
						<div className="label">
							<span className="label-text font-semibold">Email Address</span>
						</div>
						<input
							type="email"
							id="email"
							placeholder="Email address"
							className={`input input-bordered w-full max-w-lg ${
								email === initialData.email ? "" : "input-success"
							}`}
							onChange={e => {
								setEmail(e.target.value);
								if (e.target.value !== initialData.email) {
									setEmailInfo("You will need reverify your new email.");
								} else {
									setEmailInfo("");
								}
							}}
							value={email}
						/>
						<p className="text-info text-sm">{emailInfo}</p>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="phone">
						<div className="label">
							<span className="label-text font-semibold">Phone</span>
						</div>
						<input
							type="text"
							id="phone"
							placeholder="Phone number"
							className={`input input-bordered w-full max-w-lg ${
								phone === initialData.phone ? "" : "input-success"
							}`}
							onChange={e => setPhone(e.target.value)}
							value={phone}
						/>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="gender">
						<div className="label">
							<span className="label-text font-semibold">Gender</span>
						</div>
						<select
							id="gender"
							className={`from-control select w-full max-w-lg input-bordered ${
								gender === initialData.gender ? "" : "input-success"
							}`}
							onChange={e => {
								setGender(e.target.value);
							}}
							defaultValue={gender}
						>
							<option>Male</option>
							<option>Female</option>
							<option>Other</option>
						</select>
					</label>
					<label className="form-control w-full max-w-lg" htmlFor="type">
						<div className="label">
							<span className="label-text font-semibold">Type</span>
						</div>
						<select
							disabled={type === "user"}
							id="type"
							className="from-control select w-full max-w-lg input-bordered"
							onChange={e => {
								setType(e.target.value);
							}}
							defaultValue={type}
						>
							<option>User</option>
							<option>Admin</option>
						</select>
						{type === "user" && <p className="text-warning text-sm">You are not authorized</p>}
					</label>
					<div
						onClick={handleUpdate}
						className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
					>
						Update
					</div>
				</form>
			</div>
		</>
	);
};

export default EditUser;
