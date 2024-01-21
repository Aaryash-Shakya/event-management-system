import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";

const MyRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path="" element={<Layouts />}>
					<Route path="/" element={<HomePage/>} />
				</Route>
			</Routes>
		</Router>
	);
};

export default MyRoutes;
