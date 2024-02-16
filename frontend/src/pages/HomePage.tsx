import React from "react";
import Header from "../components/Header";
import { isAuthenticated } from "../auth/authIndex";

const HomePage: React.FC = () => {
	isAuthenticated();
	return (
		<>
			<Header />
			<div className="md:container md:mx-auto">dsfgahjk</div>
		</>
	);
};

export default HomePage;
