import React from "react";
import { useBearStore } from "../store/store";

const Profile: React.FC = () => {
	const bears = useBearStore(state => state.bears);

	return (
		<>
			<h1>Profile</h1>
			<div>Count = {bears}</div>
			<button className="btn btn-primary" onClick={useBearStore(state => state.increment)}>Increment</button>
			<button className="btn btn-primary" onClick={useBearStore(state => state.decrement)}>Decrement</button>
		</>
	);
};

export default Profile;
