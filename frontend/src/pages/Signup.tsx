import { FormEvent, useState } from "react";
import AccountForm from "../components/AccountForm";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import ContactForm from "../components/ContactForm";
import UserForm from "../components/UserForm";
import { GoHome } from "react-icons/go";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

type FormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	city: string;
	phone: string;
	dateOfBirth: string;
	gender: string;
};

const INITIAL_DATA: FormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	city: "",
	phone: "",
	dateOfBirth: "",
	gender: "",
};

const SignUp = () => {
	const navigate = useNavigate();

	const [data, setData] = useState(INITIAL_DATA);
	function updateFields(fields: Partial<FormData>) {
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
		alert("Successful Account Creation");
	}

	return (
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
				<form className="form-control w-full items-start">
					{/* form field */}
					{step}

					{/* buttons */}
					<div className="w-full max-w-lg mt-5 text-lg text-white flex justify-evenly items-center">
						{isFirstStep ? (
							<div
								className="btn btn-primary btn-circle w-2/5 text-white pe-5 text-xl"
								onClick={() => navigate("/")}
							>
								<GoHome size={30} />
								Home
							</div>
						) : (
							<div className="btn btn-primary btn-circle w-2/5 text-white pe-5 text-xl" onClick={prev}>
								<MdOutlineKeyboardArrowLeft size={40} />
								Prev
							</div>
						)}
						{isLastStep ? (
							<div
								className="btn btn-primary btn-circle w-2/5 text-white ps-5 text-xl"
								onClick={handleSubmit}
							>
								Submit
								<TiTick size={30} />
							</div>
						) : (
							<div className="btn btn-primary btn-circle w-2/5 text-white ps-5 text-xl" onClick={next}>
								Next
								<MdOutlineKeyboardArrowRight size={40} />
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
