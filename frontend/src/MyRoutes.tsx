import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminRoute from "./auth/AdminRoute";

const MyRoutes = () => {
	return (
		<Router>
			<Routes>

				{/* public route */}
				<Route path="" element={<Layouts />}>
					<Route index element={<HomePage />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/event-details/:event_id" element={<EventDetails />} />
				</Route>
				
				{/* private route */}
				<Route path="" element={<PrivateRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
				
				{/* admin route */}
				<Route path="/admin" element={<AdminRoute />}>
					<Route path="/dashboard" element={<Profile />} />
				</Route>
				
				<Route path="*" element={<PageNotFound />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
			</Routes>
		</Router>
	);
};

export default MyRoutes;
