import React from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivateRoute:React.FC = async () => {
	try {
		const val = await isAuthenticated();
		if (val === false) {
			console.log("unauthorized");
			return <Navigate to="/unauthorized" />;
		} else {
			console.log("authorized " + val);
			return (
				<>
					<Navbar />
					<Outlet />
				</>
			);
		}
	} catch (err) {
		console.log(err);
		return <Navigate to="/unauthorized" />;
	}
};

export default PrivateRoute;
