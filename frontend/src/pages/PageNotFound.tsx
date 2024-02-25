import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const PageNotFound: React.FC = () => {
	return (
		<>
			<Navbar />
			<div className="bg-gradient-to-r from-green-300 to-yellow-200">
				<div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
					<div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
						<div className="border-t border-gray-200 text-center pt-8">
							<h1 className="text-9xl font-bold text-green-400">404</h1>
							<h1 className="text-6xl font-medium py-8">Oops! Page not found</h1>
							<p className="text-2xl pb-8 px-12 font-medium">
								Oops! The page you are looking for does not exist. It might have been moved or deleted.
							</p>
							<Link
								to="/"
								className="bg-gradient-to-r from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
							>
								HOME
							</Link>
							<Link
								to="/about-us"
								className="bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-white font-semibold px-6 py-3 rounded-md"
							>
								Contact Us
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
