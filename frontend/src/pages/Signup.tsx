import { FormEvent, useState } from "react";
import AccountForm from "../components/form/AccountForm";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import ContactForm from "../components/form/ContactForm";
import UserForm from "../components/form/UserForm";
import { GoHome, GoXCircleFill } from "react-icons/go";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signup } from "../auth/authIndex";
import { FaCheckCircle } from "react-icons/fa";
import { SuccessOrError } from "../types/response";
import { SignupFormData } from "../types/form";
import { useUserStore } from "../store/store";

const INITIAL_DATA: SignupFormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	city: "",
	phone: "",
	dateOfBirth: "",
	gender: "",
};

const SignUp: React.FC = () => {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [data, setData] = useState(INITIAL_DATA);
	function updateFields(fields: Partial<SignupFormData>) {
		setData(prev => {
			return { ...prev, ...fields };
		});
	}
	const { step, isFirstStep, isLastStep, prev, next } = useMultiStepForm([
		<AccountForm {...data} updateFields={updateFields} />,
		<ContactForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
	]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!isLastStep) return next();
		signup(data).then((resData: SuccessOrError) => {
			console.log(resData);
			if (resData.errorName) {
				setErrorMessage(resData.errorMessage);
				setSuccessMessage("");
			} else {
				setErrorMessage("");
				setSuccessMessage(resData.message);
				// to use for verify-email page
				useUserStore.setState({ email: data.email });
				localStorage.setItem("email", data.email);
				setTimeout(() => {
					navigate("/verify-email");
				}, 1000);
			}
		});
	}

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
		<div
			className="hero min-h-screen"
			style={{
				backgroundImage: "url(../../public/photos/people-walking-on-grass.jpg)",
			}}
		>
			<div className="hero-overlay bg-opacity-20"></div>
			<div className="hero-content">
				<div className="bg-opacity-90 bg-base-100 rounded-xl flex-col m-4 lg:p-10 md:px-7 px-4 py-10 gap-5 w-full max-w-lg">
					<p className="text-3xl font-bold text-center">Sign up</p>
					<p className="text-3xl font-semibold text-center">Join us and start exploring</p>
					<form className="form-control w-full items-start pt-4" onSubmit={handleSubmit}>
						{/* show message */}
						{showErrorMessage()}
						{showSuccessMessage()}

						{/* form field */}
						{step}

						{/* buttons */}
						<div className="w-full max-w-lg mt-5 text-lg text-white flex justify-evenly items-center">
							{isFirstStep ? (
								<div
									className="btn btn-primary btn-circle w-2/5 text-white pe-5 text-xl"
									onClick={() => {
										if (confirm("Form data will be lost. Are you sure you want to go back?"))
											navigate("/");
									}}
								>
									<GoHome size={30} />
									Home
								</div>
							) : (
								<div
									className="btn btn-primary btn-circle w-2/5 text-white pe-5 text-xl"
									onClick={prev}
								>
									<MdOutlineKeyboardArrowLeft size={40} />
									Prev
								</div>
							)}
							<button type="submit" className="btn btn-primary btn-circle w-2/5 text-white ps-5 text-xl">
								{isLastStep ? (
									<>
										Submit
										<TiTick size={30} />
									</>
								) : (
									<>
										Next
										<MdOutlineKeyboardArrowRight size={40} />
									</>
								)}
							</button>
						</div>
						<div className="text-gray-600 text-center w-full max-w-lg mt-3">
							Already have an account?{" "}
							<Link to="/login" className="text-primary font-semibold">
								Login
							</Link>
						</div>
						<div
							className="btn btn-circle w-full max-w-lg mt-2 text-lg text-white relative"
							style={{ backgroundColor: "#6497ef" }}
						>
							<FcGoogle size={30} className="absolute left-5 drop-shadow-md shadow-black" />
							Continue with Google
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
		</div>
	);
};

export default SignUp;
