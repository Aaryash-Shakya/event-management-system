import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminRoute from "./auth/AdminRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ViewProfile from "./pages/ViewProfile";
import Dashboard from "./admin/Dashboard";
import AddEvent from "./admin/AddEvent";
import AllEvents from "./admin/AllEvents";
import UpdateEvent from "./admin/UpdateEvent";

const MyRoutes: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* public route */}
				<Route path="" element={<Layouts />}>
					<Route index element={<HomePage />} />
					{/* user */}
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="verify-email" element={<VerifyEmail />} />
					<Route path="view-profile/:userId" element={<ViewProfile />} />

					{/* event */}
					<Route path="events" element={<EventsPage />} />
					<Route path="event-details/:event_id" element={<EventDetails />} />

					<Route path="contact" element={<Contact />} />
				</Route>

				{/* private route */}
				<Route path="" element={<PrivateRoute />}>
					<Route path="profile" element={<Profile />} />
				</Route>

				{/* admin route */}
				<Route path="admin" element={<AdminRoute />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="all-event" element={<AllEvents />} />
					<Route path="add-event" element={<AddEvent />} />
					<Route path="update-event/:event_id" element={<UpdateEvent />} />
				</Route>

				<Route path="*" element={<PageNotFound />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
			</Routes>
		</Router>
	);
};

export default MyRoutes;
