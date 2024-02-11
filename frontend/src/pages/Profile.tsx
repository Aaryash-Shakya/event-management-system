import React from "react";
import { useStore } from "zustand";

const Profile: React.FC = () => {
	const bears = useStore(state => state.bears);

	const decrementBears = useStore(state => state.decrement);

	return (
		<>
			<h1>Profile</h1>
			<div>Count = {bears}</div>
			<div onClick={decrementBears}>Decrement</div>
			<div>Increment</div>
		</>
	);
};

export default Profile;
