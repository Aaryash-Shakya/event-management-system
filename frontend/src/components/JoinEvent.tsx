import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserStore } from "../store/store";
import serverUrl from "../config";
import { GoXCircleFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

const JoinEvent: React.FC = () => {
	const [currentStage, setCurrentState] = useState<"payment" | "join">("join");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const event_id = parseInt(useParams().event_id!);

	const handleJoinEvent = () => {
		axios
			.post(
				`${serverUrl}/api/user-event/join-event`,
				{
					user_id: useUserStore.getState().userId || localStorage.getItem("userId"),
					event_id: event_id,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				}
			)
			.then(res => {
				console.log(res.data);
				setErrorMessage("");
				setSuccessMessage(res.data.message);
			})
			.catch(err => {
				console.log(err);
				setErrorMessage(err.response.data.errorMessage || "Failed to join event");
				setSuccessMessage("");
			});
	};

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
			<div className="mx-auto p-4 max-w-lg flex flex-col items-start gap-4 border">
				{showSuccessMessage()}
				{showErrorMessage()}
				<h1 className="text-2xl font-bold">Join Event</h1>
				<p>
					By joining the event you agree to our{" "}
					<Link to="terms-and-service" className="text-black underline">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link to="privacy-policy" className="text-black underline">
						Privacy Policy
					</Link>
				</p>
				<div className="btn btn-primary">
					<button
						onClick={() => {
							handleJoinEvent();
							setCurrentState("payment");
						}}
					>
						Join Event
					</button>
				</div>
				{currentStage == "payment" && (
					<>
						<form className="form-control w-full items-start border p-4">
							<label className="form-control w-full max-w-lg" htmlFor="cardNumber">
								<div className="label">
									<span className="label-text font-semibold">Card Number</span>
								</div>
								<input
									type="number"
									id="cardNumber"
									placeholder="Your email"
									className="input input-bordered w-full max-w-lg"
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="amount">
								<div className="label">
									<span className="label-text font-semibold">Amount</span>
								</div>
								<input
									type="number"
									id="amount"
									placeholder="Payment Amount"
									className="input input-bordered w-full max-w-lg"
								/>
							</label>
						</form>
					</>
				)}
			</div>
		</>
	);
};

export default JoinEvent;
