import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav>
				<div className="navbar bg-base-100 z-50 fixed top-0">
					<div className="flex-1">
						<a className="btn btn-ghost text-xl text-primary" href="/">
							<img
								src="../../public/hike-link-horizontal-logo/svg/logo-no-background.svg"
								alt="Hike Link logo"
								className="w-[120px]"
							/>
						</a>
						<Link to="/explore" className="btn btn-ghost">
							Explore
						</Link>
						<Link to="/events" className="btn btn-ghost">
							Events
						</Link>
						<Link to="/about-us" className="btn btn-ghost">
							About Us
						</Link>
						<Link to="/login" className="btn btn-ghost">
							Log In
						</Link>
					</div>
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<a className="justify-between">Profile</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
