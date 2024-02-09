import React from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC = () => {
	return isAuthenticated() ? <Navigate to="/profile" /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
