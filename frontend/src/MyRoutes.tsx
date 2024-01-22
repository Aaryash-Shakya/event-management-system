import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";

const MyRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="" element={<Layouts />}>
					<Route index element={<HomePage />} />	
					<Route path="/events" element={<EventsPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MyRoutes;
