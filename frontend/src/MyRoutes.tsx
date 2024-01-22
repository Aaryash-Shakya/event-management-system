import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import PageNotFound from "./pages/PageNotFound";

const MyRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="" element={<Layouts />}>
					<Route index element={<HomePage />} />
					<Route path="/events" element={<EventsPage />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default MyRoutes;
