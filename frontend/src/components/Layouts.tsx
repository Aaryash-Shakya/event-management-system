import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layouts = (): ReactNode => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layouts;
