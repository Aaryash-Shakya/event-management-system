import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

const Layouts = (): ReactNode => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default Layouts;
