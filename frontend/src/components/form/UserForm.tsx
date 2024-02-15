import { UserData } from "../../types/form";

type UserFormProps = UserData & {
	updateFields: (fields: Partial<UserData>) => void;
};

const UserForm = ({ dateOfBirth, gender, updateFields }: UserFormProps) => {
	return (
		<>
			{/* step 3 user details*/}
			{/* stepper */}
			<ul className="steps steps-horizontal w-full max-w-lg my-5">
				<li data-content="✓" className="step step-primary">
					Account
				</li>
				<li data-content="✓" className="step step-primary">
					Contact
				</li>
				<li className="step step-primary font-semibold">User</li>
			</ul>

			{/* date of birth */}
			<label className="form-control w-full max-w-lg" htmlFor="dateOfBirth">
				<div className="label">
					<span className="label-text">
						<span className="font-semibold">Date Of Birth</span> (optional)
					</span>
				</div>
				<input
					type="date"
					value={!null && dateOfBirth}
					id="dateOfBirth"
					placeholder="Date of birth"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ dateOfBirth: e.target.value })}
				/>
			</label>

			{/* gender */}
			<label className="form-control w-full max-w-lg" htmlFor="gender">
				<div className="label">
					<span className="label-text">
						<span className="font-semibold">Gender</span> (optional)
					</span>
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
		</>
	);
};

export default UserForm;
