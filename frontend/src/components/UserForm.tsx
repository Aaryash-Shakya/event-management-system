import FormWrapper from "./FormWrapper";

type UserData = {
	dateOfBirth: string;
	gender: string;
};

type UserFormProps = UserData & {
	updateFields: (fields: Partial<UserData>) => void;
};

const UserForm = ({ dateOfBirth, gender, updateFields }:UserFormProps) => {
	return (
		<FormWrapper title="User Details">
			{/* step 3 user details*/}
			<div className="form-wrapper">
				{/* stepper */}
				<ul className="steps steps-horizontal w-full max-w-lg">
					<li data-content="✓" className="step step-primary">Account</li>
					<li data-content="✓" className="step step-primary">Contact</li>
					<li className="step step-primary">User</li>
				</ul>

				{/* date of birth */}
				<label className="form-control w-full max-w-lg" htmlFor="dateOfBirth">
					<div className="label">
						<span className="label-text font-semibold">Date of Birth</span>
					</div>
					<input
						type="text"
						value={dateOfBirth}
						id="dateOfBirth"
						placeholder="Date of birth"
						className="input input-bordered w-full max-w-lg"
						onChange={e => updateFields({ dateOfBirth: e.target.value })}
					/>
				</label>
				
				{/* gender */}
				<label className="form-control w-full max-w-lg" htmlFor="gender">
					<div className="label">
						<span className="label-text font-semibold">Gender</span>
					</div>
					<input
						type="text"
						value={gender}
						id="gender"
						placeholder="Gender"
						className="input input-bordered w-full max-w-lg"
						onChange={e => updateFields({ gender: e.target.value })}
					/>
				</label>
			</div>
		</FormWrapper>
	);
};

export default UserForm;
