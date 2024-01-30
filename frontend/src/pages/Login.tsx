import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");

	const navigate = useNavigate();

	const handleLogin = () => {
		console.log("Login");
		console.log(email, password);

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

		// Perform login logic if email and password are valid
		if (email && password) {
			setTimeout(() => {
				navigate("/explore");
			}, 1000);
		}
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
					<p className="text-3xl font-bold text-center">Welcome back</p>
					<p className="text-3xl font-semibold text-center">Login and start exploring</p>
					<form className="form-control w-full items-start">
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
						<div
							onClick={handleLogin}
							className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
						>
							Log In
						</div>
						<div className="btn btn-ghost btn-circle w-full max-w-lg mt-2 text-lg text-primary hover:bg-white">
							Forgot your password
						</div>
						<div
							className="btn btn-circle w-full max-w-lg mt-2 text-lg text-white relative"
							style={{ backgroundColor: "#6497ef" }}
						>
							<FcGoogle size={30} className="absolute left-5 drop-shadow-md shadow-black" />
							Continue with Google
						</div>
						<div className="text-gray-600 text-center w-full max-w-lg mt-2">
							Don't have an account?{" "}
							<Link to="/signup" className="text-primary font-semibold">
								Sign Up
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
				</div>
			</div>
		</>
	);
};

export default Login;
