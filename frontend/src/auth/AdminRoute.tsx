import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import Navbar from "../components/Navbar";

const AdminRoute: React.FC = () => {
	const [isAuthorized, setIsAuthorized] = useState<boolean | "user" | "admin" | null>(null);

	useEffect(() => {
		const checkAuthorization = async () => {
			try {
				const val = await isAuthenticated();
				setIsAuthorized(val);
			} catch (err) {
				console.log(err);
				setIsAuthorized(false);
			}
		};

		checkAuthorization();
	}, []);

	if (isAuthorized === null) {
		return (
			<>
				Loading <VscLoading />
			</>
		);
	} else if (isAuthorized !== "admin") {
		console.log("unauthorized");
		return <Navigate to="/unauthorized" />;
	}

	console.log("authorized " + isAuthorized);
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default AdminRoute;
