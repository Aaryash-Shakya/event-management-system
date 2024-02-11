import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

const PrivateRoute: React.FC = () => {
	const [isAuthorized, setIsAuthorized] = useState<false | "user" | "admin" | null>(null);

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
	} else if (isAuthorized === false) {
		console.log("unauthorized");
		return <Navigate to="/unauthorized" />;
	}

	console.log("authorized " + isAuthorized);
	return (
		<>
			<Outlet />
		</>
	);
};

export default PrivateRoute;
