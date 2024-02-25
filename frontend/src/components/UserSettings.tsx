import axios from "axios";
import React, { useState } from "react";
import serverUrl from "../config";
import { useUserStore } from "../store/store";

const UserSettings: React.FC = () => {
	const [oldPassword, setOldPassword] = useState<string>("");
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
	const [email, setEmail] = useState<string>(useUserStore.getState().email || "");
	const [deletePassword, setDeletePassword] = useState<string>("");
	const [deleteAccountToken, setDeleteAccountToken] = useState<string>("");
	const [confirmState, setConfirmState] = useState<boolean>(false);

	const handleChangePassword = () => {};
	const handleDeleteAccount = () => {
		axios
			.delete(`${serverUrl}/api/user/delete-user`, {
				data: {
					email: email,
					password: deletePassword,
				},
			})
			.then(res => {
				console.log(res.data);
				setConfirmState(true);
			});
	};

	const handleConfirmDelete = () => {
		axios.delete(`${serverUrl}/api/user/confirm-delete-user`, {
			data: {
				email: email,
				token: deleteAccountToken,
			},
		});
	};
	return (
		<>
			<div className="container mx-auto max-w-lg flex flex-col items- justify-center gap-4 p-4">
				<h1 className="text-xl font-bold border-b-2">Account Settings</h1>

				<div className="collapse collapse-arrow bg-base-100 border-2">
					<input type="radio" name="my-accordion-2" defaultChecked />
					<div className="collapse-title">
						<h2 className="font-semibold text-lg">Change Password</h2>
					</div>
					<div className="collapse-content">
						<form className="form-control w-full items-start p-4">
							<label className="form-control w-full max-w-lg" htmlFor="oldPassword">
								<div className="label">
									<span className="label-text font-semibold">Old Password</span>
								</div>
								<input
									type="password"
									id="oldPassword"
									placeholder="Your old password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setOldPassword(e.target.value)}
									value={oldPassword}
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="newPassword">
								<div className="label">
									<span className="label-text font-semibold">New Password</span>
								</div>
								<input
									type="password"
									id="newPassword"
									placeholder="Your new password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setNewPassword(e.target.value)}
									value={newPassword}
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="confirmNewPassword">
								<div className="label">
									<span className="label-text font-semibold">Confirm New Password</span>
								</div>
								<input
									type="password"
									id="confirmNewPassword"
									placeholder="Confirm new password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setConfirmNewPassword(e.target.value)}
									value={confirmNewPassword}
								/>
							</label>
							<div
								onClick={handleChangePassword}
								className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
							>
								Change Password
							</div>
						</form>
					</div>
				</div>
				<div className="collapse collapse-arrow bg-base-100 border-2">
					<input type="radio" name="my-accordion-2" />
					<div className="collapse-title">
						<h2 className="font-semibold text-lg">Delete Account</h2>
						<p className="text-warning">
							Warning: Deleting your account is irreversible. All your data will be permanently deleted.
							Are you sure you want to proceed?
						</p>
					</div>
					<div className="collapse-content">
						<form className="form-control w-full items-start border p-4">
							<label className="form-control w-full max-w-lg" htmlFor="email">
								<div className="label">
									<span className="label-text font-semibold">Email</span>
								</div>
								<input
									type="email"
									id="email"
									placeholder="Your email"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label className="form-control w-full max-w-lg" htmlFor="deletePassword">
								<div className="label">
									<span className="label-text font-semibold">Password</span>
								</div>
								<input
									type="password"
									id="deletePassword"
									placeholder="Your password"
									className="input input-bordered w-full max-w-lg"
									onChange={e => setDeletePassword(e.target.value)}
									value={deletePassword}
								/>
							</label>
							{confirmState === false ? (
								<div
									onClick={handleDeleteAccount}
									className="btn btn-primary btn-circle w-full max-w-lg mt-5 text-lg text-white"
								>
									Delete Account
								</div>
							) : (
								<>
									<p className="text-error">
										Are you sure you want to delete your account? A verification token has been sent
										to your email.
									</p>
									<label className="form-control w-full max-w-lg" htmlFor="deleteAccountToken">
										<div className="label">
											<span className="label-text font-semibold">Delete Account Token</span>
										</div>
										<input
											type="number"
											max={6}
											min={6}
											id="deleteAccountToken"
											placeholder="Confirmation account deletion token"
											className="input input-bordered w-full max-w-lg"
											onChange={e => setDeleteAccountToken(e.target.value)}
											value={deleteAccountToken}
										/>
									</label>
									<div
										onClick={handleConfirmDelete}
										className="btn btn-error btn-circle w-full max-w-lg mt-5 text-lg text-white"
									>
										Confirm Delete
									</div>
								</>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserSettings;
