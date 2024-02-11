import { AccountData } from "../../types/form";

type AccountFormProps = AccountData & {
	updateFields: (fields: Partial<AccountData>) => void;
};

const AccountForm = ({ name, email, password, confirmPassword, updateFields }: AccountFormProps) => {
	return (
		<>
			{/* step 1 login details*/}
			{/* stepper */}
			<ul className="steps steps-horizontal w-full max-w-lg my-5">
				<li className="step step-primary font-semibold">Account</li>
				<li className="step">Contact</li>
				<li className="step">User</li>
			</ul>

			{/* name */}
			<label className="form-control w-full max-w-lg" htmlFor="name">
				<div className="label">
					<span className="label-text font-semibold">Name</span>
				</div>
				<input
					type="text"
					value={name}
					id="name"
					placeholder="Full name"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ name: e.target.value })}
					required
				/>
			</label>

			{/* email */}
			<label className="form-control w-full max-w-lg" htmlFor="email">
				<div className="label">
					<span className="label-text font-semibold">Email Address</span>
				</div>
				<input
					type="email"
					value={email}
					id="email"
					placeholder="Email address"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ email: e.target.value })}
					required
				/>
			</label>

			{/* password */}
			<label className="form-control w-full max-w-lg" htmlFor="password">
				<div className="label">
					<span className="label-text font-semibold">Password</span>
				</div>
				<input
					type="password"
					value={password}
					id="password"
					placeholder="Password"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ password: e.target.value })}
					required
					minLength={8}
				/>
			</label>

			{/* confirm password */}
			<label className="form-control w-full max-w-lg" htmlFor="confirmPassword">
				<div className="label">
					<span className="label-text font-semibold">Confirm password</span>
				</div>
				<input
					type="password"
					value={confirmPassword}
					id="confirmPassword"
					placeholder="Confirm password"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ confirmPassword: e.target.value })}
					required
					minLength={8}
				/>
			</label>
		</>
	);
};

export default AccountForm;
