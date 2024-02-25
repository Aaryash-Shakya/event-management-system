import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import serverUrl from "../config";
import axios from "axios";

const VerifyEmail: React.FC = () => {
	const [otp, setOtp] = useState<string>("");
	const [otpError, setOtpError] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [email, setEmail] = useState<string>(localStorage.getItem("email") || "email not found");
	const navigate = useNavigate();

	const checkError = (otpValue: string) => {
		if (!otpValue) {
			setOtpError("Otp is required");
		} else if (otpValue.length !== 6) {
			setOtpError("Otp must be 6 characters");
		} else {
			setOtpError("");
		}
	};

	const handleEmailVerification = () => {
		// Perform login logic if otp is valid
		if (otpError !== "") {
			setErrorMessage("Please fill the form correctly");
			setSuccessMessage("");
			return;
		}
		axios
			.patch(`${serverUrl}/api/user/verify-email`, {
				email: email,
				email_verification_token: otp,
			})
			.then(() => {
				setErrorMessage("");
				setSuccessMessage("Email verified successfully");
				setTimeout(() => {
					navigate("/login");
				}, 1000);
			})
			.catch(err => {
				setErrorMessage(err.response.data.message || "Email verification failed");
				setSuccessMessage("");
				console.log(err.response);
			});
	};

	const resendOtp = () => {
		alert("token resent");
		axios
			.patch(`${serverUrl}/api/user/resend-verification-token`, {
				email: email,
			})
			.then(res => {
				setErrorMessage("");
				setSuccessMessage("OTP sent successfully");
				console.log(res.data);
			})
			.catch(err => {
				setErrorMessage("Failed to resend OTP");
				setSuccessMessage("");
				console.log(err);
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
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: "url(../../public/photos/people-walking-on-grass.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-20"></div>
				<div className="hero-content bg-opacity-90 bg-base-100 rounded-xl flex-col m-4 lg:p-10 md:px-7 px-4 py-10 gap-5 w-full max-w-lg">
					<p className="text-3xl font-bold text-center text-primary-content">Email Verification</p>
					<p className="text-lf text-center text-gray-500">
						We have sent the verification code to your email address
					</p>

					{/* show message */}
					{showErrorMessage()}
					{showSuccessMessage()}

					<form className="form-control w-full items-start">
						<label className="form-control w-full max-w-lg" htmlFor="email">
							<div className="label">
								<span className="label-text font-semibold">Email Address</span>
							</div>
							<input
								disabled
								type="email"
								id="email"
								placeholder="Email address"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
						</label>
						<label className="form-control w-full max-w-lg" htmlFor="otp">
							<div className="label">
								<span className="label-text font-semibold">One Time Password</span>
							</div>
							<input
								required
								type="number"
								id="otp"
								placeholder="One Time Password"
								className="input input-bordered w-full max-w-lg"
								onChange={e => {
									setOtp(e.target.value);
									checkError(e.target.value);
								}}
							/>
							<p className="text-error text-sm">{otpError}</p>
						</label>
						<div
							onClick={handleEmailVerification}
							className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
						>
							Confirm
						</div>
						<div className="text-gray-600 text-center w-full max-w-lg mt-2 text-lg">
							Didn't receive the OTP?{" "}
							<span
								className="text-primary font-semibold cursor-pointer underline"
								onClick={() => resendOtp()}
							>
								Resend OTP
							</span>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default VerifyEmail;
