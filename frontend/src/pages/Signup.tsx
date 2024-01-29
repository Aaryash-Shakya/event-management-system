import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoHome } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [nameError, setNameError] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");
	const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

	const [step, setStep] = useState<number>(1);

	const navigate = useNavigate();

	const handleStep1 = () => {
		console.log("Login");
		console.log(email, password);

		// Name validation
		if (!name) {
			setNameError("Name is required");
		} else {
			setNameError("");
		}

		// Email validation
		if (!email) {
			setEmailError("Email is required");
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError("Email address is invalid");
		} else {
			setEmailError("");
		}

		// Password validation
		if (!password) {
			setPasswordError("Password is required");
		} else if (password.length < 8) {
			setPasswordError("Password must be at least 8 characters");
		} else {
			setPasswordError("");
		}

		// Confirm password validation
		if (!confirmPassword) {
			setConfirmPasswordError("Confirm password is required");
		} else if (password !== confirmPassword) {
			setConfirmPasswordError("Passwords do not match");
		} else {
			setConfirmPasswordError("");
		}

		// Perform if all data are valid
		if (nameError === "" && emailError === "" && passwordError === "" && confirmPasswordError === "") {
			const dataStep1 = {
				name,
				email,
				password,
			};
			localStorage.setItem("dataStep1", JSON.stringify(dataStep1));
			setStep(2);
		}
	};

	return (
		<>
			<div
				className="hero min-h-screen pt-16"
				style={{
					backgroundImage: "url(../../public/photos/people-walking-on-grass.jpg)",
				}}
			>
				<div className="hero-overlay bg-opacity-20"></div>
				<div className="hero-content bg-opacity-90 bg-base-100 rounded-xl flex-col m-4 lg:p-10 md:px-7 px-4 py-10 gap-5 w-full max-w-lg">
					<p className="text-3xl font-bold text-center">Sign up</p>
					<p className="text-3xl font-semibold text-center">Join us and start exploring</p>

					{/* step 1 login details*/}
					<form className="form-control w-full items-start">
						{/* stepper */}
						<ul className="steps steps-horizontal w-full max-w-lg">
							<li className="step step-neutral">Register</li>
							<li className="step">Contact</li>
							<li className="step">User Details</li>
						</ul>

						{/* name */}
						<label className="form-control w-full max-w-lg" htmlFor="name">
							<div className="label">
								<span className="label-text font-semibold">Name</span>
							</div>
							<input
								type="text"
								id="name"
								placeholder="Full name"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setName(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">{nameError}</p>
						</label>

						{/* email */}
						<label className="form-control w-full max-w-lg" htmlFor="email">
							<div className="label">
								<span className="label-text font-semibold">Email Address</span>
							</div>
							<input
								type="email"
								id="email"
								placeholder="Email address"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setEmail(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">{emailError}</p>
						</label>

						{/* password */}
						<label className="form-control w-full max-w-lg" htmlFor="password">
							<div className="label">
								<span className="label-text font-semibold">Password</span>
							</div>
							<input
								type="password"
								id="password"
								placeholder="Password"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setPassword(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">{passwordError}</p>
						</label>

						{/* confirm password */}
						<label className="form-control w-full max-w-lg" htmlFor="confirmPassword">
							<div className="label">
								<span className="label-text font-semibold">Confirm password</span>
							</div>
							<input
								type="password"
								id="confirmPassword"
								placeholder="Confirm password"
								className="input input-bordered w-full max-w-lg"
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">{confirmPasswordError}</p>
						</label>
						<div onClick={handleStep1} className="w-full max-w-lg mt-5 text-lg text-white flex justify-evenly items-center">
							<div className="btn btn-primary btn-circle w-2/5 text-white pe-5 text-xl">
								<GoHome size={30} />
								Prev
							</div>
							<div className="btn btn-primary btn-circle w-2/5 text-white ps-5 text-xl">
								Next
								<MdOutlineKeyboardArrowRight size={40} />
							</div>
						</div>
						<div
							className="btn btn-circle w-full max-w-lg mt-5 text-lg text-white relative"
							style={{ backgroundColor: "#6497ef" }}
						>
							<FcGoogle size={30} className="absolute left-5 drop-shadow-md shadow-black" />
							Continue with Google
						</div>
						<div className="text-gray-600 text-center w-full max-w-lg mt-2">
							Already have an account?{" "}
							<Link to="/login" className="text-primary font-semibold">
								Log in
							</Link>
						</div>
						<p className="text-gray-500 text-center text-sm w-full max-w-lg mt-5">
							By continuing to use Hike Link, you agree to our{" "}
							<Link to="terms-and-service" className="text-black underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link to="privacy-policy" className="text-black underline">
								Privacy Policy
							</Link>
							. Personal data added to Hike Link is public by default
						</p>
					</form>

                    {/* step 2 */}
				</div>
			</div>
		</>
	);
};

export default Signup;
