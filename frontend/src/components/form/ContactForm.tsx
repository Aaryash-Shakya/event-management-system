import { ContactData } from "../../types/form";

type ContactFormProps = ContactData & {
	updateFields: (fields: Partial<ContactData>) => void;
};

const ContactForm = ({ city, phone, updateFields }: ContactFormProps) => {
	return (
		<>
			{/* step 2 contact details*/}
			{/* stepper */}
			<ul className="steps steps-horizontal w-full max-w-lg my-5">
				<li data-content="✓" className="step step-primary">
					Account
				</li>
				<li className="step step-primary font-semibold">Contact</li>
				<li className="step">User</li>
			</ul>

			{/* city */}
			<label className="form-control w-full max-w-lg" htmlFor="city">
				<div className="label">
					<span className="label-text font-semibold">City</span>
				</div>
				<input
					type="text"
					value={city}
					id="city"
					placeholder="City"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ city: e.target.value })}
					required
				/>
			</label>

			{/* phone */}
			<label className="form-control w-full max-w-lg" htmlFor="phone">
				<div className="label">
					<span className="label-text font-semibold">Phone</span>
				</div>
				<input
					type="text"
					value={phone}
					id="phone"
					placeholder="Phone"
					className="input input-bordered w-full max-w-lg"
					onChange={e => updateFields({ phone: e.target.value })}
					required
				/>
			</label>
		</>
	);
};

export default ContactForm;
