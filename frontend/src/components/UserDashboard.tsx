import React, { useState } from "react";
import UserHistory from "./UserHistory";

const UserDashboard: React.FC = () => {
	const [currentTab, setCurrentTab] = useState<string>("userInfo");

	return (
		<>
			<div className="w-full">
				<div role="tablist" className="tabs tabs-bordered my-4">
					<div
						role="tab"
						className={`tab text-xl pb-10 ${currentTab === "userInfo" ? "tab-active" : ""}`}
						onClick={() => {
							setCurrentTab("userInfo");
						}}
					>
						User Info
					</div>
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
				</div>

				{/* render data */}
				{currentTab === "history" && <UserHistory />}
			</div>
		</>
	);
};

export default UserDashboard;
