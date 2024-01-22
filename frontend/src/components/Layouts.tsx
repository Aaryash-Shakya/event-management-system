import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layouts = (): ReactNode => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layouts;
