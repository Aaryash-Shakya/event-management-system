import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<>
			<nav>
				<div className="navbar bg-base-100 z-50 fixed top-0 w-full">
					<div className="navbar-start">
						<div className="dropdown">
							<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h8m-8 6h16"
									/>
								</svg>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<Link to="/explore">Explore</Link>
								</li>
								<li>
									<Link to="/events">Events</Link>
								</li>
								<li>
									<a>Our Story</a>
									<ul className="p-2">
										<li>
											<Link to="/about-us">About Us</Link>
										</li>
										<li>
											<Link to="/contact">Contact</Link>
										</li>
									</ul>
								</li>
								<li>
									<Link to="/community">Community</Link>
								</li>
							</ul>
						</div>
						<Link className="btn btn-ghost text-xl text-primary" to="/">
							<img
								src="../../public/hike-link-horizontal-logo/svg/logo-no-background.svg"
								alt="Hike Link logo"
								className="w-[120px]"
							/>
						</Link>
					</div>
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1 font-semibold gap-2">
							<li>
								<Link to="/explore">Explore</Link>
							</li>
							<li>
								<Link to="/events">Events</Link>
							</li>
							<li>
								<details>
									<summary>Our Story</summary>
									<ul className="p-2">
										<li>
											<Link to="/about-us">About Us</Link>
										</li>
										<li>
											<Link to="/contact">Contact</Link>
										</li>
									</ul>
								</details>
							</li>
							<li>
								<Link to="/community">Community</Link>
							</li>
						</ul>
					</div>
					<div className="navbar-end">
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
									<Link to="/login" className="justify-between">
										Login
									</Link>
								</li>
								<li>
									<Link to="/signup" className="justify-between">
										Sign Up
									</Link>
								</li>
								<li>
									<Link to="/profile" className="justify-between">
										Profile
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
			{/* top spacer */}
			<div className="h-16"></div>
		</>
	);
};

export default Navbar;
