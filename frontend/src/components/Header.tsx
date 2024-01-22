const Header = () => {
	return (
		<>
			<img
				src="../../public/photos/two-people-hiking.jpg"
				alt="Two people hiking in the forest"
				className="w-full object-cover -z-10"
				style={{ aspectRatio: 2 / 1 }}
			/>
			<svg
				viewBox="0 0 1000 100"
				preserveAspectRatio="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-base-100"
				style={{ translate: "0 -98%" }}
			>
				<path
					fill="currentColor"
					d="M 0 64.36935513988686 L 15.625 55.98518403919095 L 31.25 50.298670947589855 L 46.875 52.51464665349761 L 62.5 51.61045995267414 L 78.125 48.456029543071324 L 93.75 50.19832828453011 L 109.375 52.865463044193646 L 125 53.974747005796225 L 140.625 62.18773875856297 L 156.25 59.288217381253105 L 171.875 52.95567704717938 L 187.5 59.4003011596116 L 203.125 63.16100418469494 L 218.75 59.080631780310185 L 234.375 57.0386614763204 L 250 62.48635062743469 L 265.625 55.38120278946781 L 281.25 53.45274021478337 L 296.875 58.08073332407553 L 312.5 60.75193921783188 L 328.125 58.89952848997902 L 343.75 65.27651168553652 L 359.375 60.687766283986385 L 375 59.08195254253971 L 390.625 61.37419309411886 L 406.25 63.909848673913835 L 421.875 63.53284415591031 L 437.5 57.39169384878138 L 453.125 56.51446444921026 L 468.75 60.33101131932409 L 484.375 59.65999550740255 L 500 49.96065720662896 L 515.625 43.36012820162173 L 531.25 43.711428223437046 L 546.875 39.889483764295605 L 562.5 42.96909603519607 L 578.125 34.83956677272647 L 593.75 39.524359356538525 L 609.375 44.34524596896813 L 625 49.0458896197679 L 640.625 45.576584934187004 L 656.25 40.438689382728384 L 671.875 39.09392661319249 L 687.5 46.51534749828013 L 703.125 47.786757567784825 L 718.75 45.55992046902508 L 734.375 48.047198731697506 L 750 59.495325038923134 L 765.625 55.631732091196916 L 781.25 51.594213998182454 L 796.875 56.33063015568017 L 812.5 53.5766451301737 L 828.125 50.111606502061804 L 843.75 50.22744261058596 L 859.375 51.650813290246944 L 875 44.72670234565942 L 890.625 46.17675967189431 L 906.25 36.03647344779262 L 921.875 33.92451896388545 L 937.5 42.48160130381874 L 953.125 45.50519399508787 L 968.75 37.78937089044462 L 984.375 47.10424780931578 L 1000 49.0313646812765 L 1000 100 L 0 100 Z"
				></path>
			</svg>
			<div className="navbar bg-opacity-25 bg-base-300 z-50 absolute top-0">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl text-primary">
						<img
							src="../../public/hike-link-horizontal-logo/svg/logo-no-background.svg"
							alt="Hike Link logo"
							className="w-[120px]"
						/>
					</a>
					<a className="btn btn-ghost">Home</a>
					<a className="btn btn-ghost">Find Events</a>
					<a className="btn btn-ghost">Help Center</a>
					<a className="btn btn-ghost">About Us</a>
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
		</>
	);
};

export default Header;
