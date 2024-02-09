import React from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate } from "react-router-dom";

const AdminRoute: React.FC = () => {
	return isAuthenticated() === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
