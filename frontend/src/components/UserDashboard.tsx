import React, { useState } from "react";
import UserHistory from "./UserHistory";
import EditUser from "./EditUser";
import UserSettings from "./UserSettings";

const UserDashboard: React.FC = () => {
	const [currentTab, setCurrentTab] = useState<string>("history");

	return (
		<>
			<div className="w-full">
				<div role="tablist" className="tabs tabs-bordered my-4">
					<div
						role="tab"
						className={`tab text-xl pb-10 ${currentTab === "history" ? "tab-active" : ""}`}
						onClick={() => {
							setCurrentTab("history");
						}}
					>
						History
					</div>
					<div
						role="tab"
						className={`tab text-xl pb-10 ${currentTab === "edit" ? "tab-active" : ""}`}
						onClick={() => {
							setCurrentTab("edit");
						}}
					>
						Edit
					</div>
					<div
						role="tab"
						className={`tab text-xl pb-10 ${currentTab === "setting" ? "tab-active" : ""}`}
						onClick={() => {
							setCurrentTab("setting");
						}}
					>
						Settings
					</div>
				</div>

				{/* render data */}
				{currentTab === "history" && <UserHistory />}
				{currentTab === "edit" && <EditUser />}
				{currentTab === "setting" && <UserSettings />}
			</div>
		</>
	);
};

export default UserDashboard;
