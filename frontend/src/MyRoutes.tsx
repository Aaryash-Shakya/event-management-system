import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const MyRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="" element={<Layouts />}>
					<Route index element={<HomePage />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default MyRoutes;
