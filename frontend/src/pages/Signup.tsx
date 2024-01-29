import { FormEvent, useState } from "react";
import AccountForm from "../components/AccountForm";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import ContactForm from "../components/ContactForm";
import UserForm from "../components/UserForm";

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

function App() {
	const [data, setData] = useState(INITIAL_DATA);
	function updateFields(fields: Partial<FormData>) {
		setData(prev => {
			return { ...prev, ...fields };
		});
	}
	const { steps, currentStep, step, isFirstStep, isLastStep, prev, next } = useMultiStepForm([
		<AccountForm {...data} updateFields={updateFields} />,
		<ContactForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
	]);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		if (!isLastStep) return next();
		alert("Successful Account Creation");
	}

	return (
		<div
			style={{
				position: "relative",
				background: "white",
				border: "1px solid black",
				padding: "2rem",
				margin: "1rem",
				borderRadius: ".5rem",
				fontFamily: "Arial",
				maxWidth: "max-content",
			}}
		>
			<form onSubmit={onSubmit}>
				<div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
					{currentStep + 1} / {steps.length}
				</div>
				{step}
				<div
					style={{
						marginTop: "1rem",
						display: "flex",
						gap: ".5rem",
						justifyContent: "flex-end",
					}}
				>
					{!isFirstStep && (
						<button type="button" onClick={prev}>
							Back
						</button>
					)}
					<button type="submit">{isLastStep ? "Finish" : "Next"}</button>
				</div>
			</form>
		</div>
	);
}

export default App;
