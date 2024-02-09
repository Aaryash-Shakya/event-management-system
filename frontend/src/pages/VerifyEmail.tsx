import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";

const VerifyEmail: React.FC = () => {
	const [otp, setOtp] = useState<string>("");
	const [otpError, setOtpError] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const navigate = useNavigate();

	const handleEmailVerification = () => {
		console.log(otp);
		if (!otp) {
			setOtpError("Otp is required");
		} else if (otp.length !== 6) {
			setOtpError("Otp must be 6 characters");
		} else {
			setOtpError("");
		}

		// Perform login logic if email and password are valid
		if (otpError === "") {
			setErrorMessage("");
			setSuccessMessage("Email verified successfully");
			console.log("perform verification");
			// navigate("/");
		}
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
						<label className="form-control w-full max-w-lg" htmlFor="otp">
							<div className="label">
								<span className="label-text font-semibold">One Time Password</span>
							</div>
							<input
								type="number"
								id="otp"
								placeholder="One Time Password"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setOtp(e.target.value)}
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
							<span className="text-primary font-semibold cursor-pointer underline">Resend OTP</span>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default VerifyEmail;
