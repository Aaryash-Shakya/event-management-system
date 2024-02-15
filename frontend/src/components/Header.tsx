import React from "react";

const Header: React.FC = () => {
	return (
		<>
			<header className="w-full flex items-center justify-center overflow-clip flex-col">
				<div
					className="hero relative"
					style={{
						backgroundImage: "url(../../public/photos/girl-in-forest.jpg)",
						backgroundAttachment: "scroll",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						aspectRatio: 2 / 1,
						minHeight: "50vh",
						maxHeight: "90vh",
					}}
				>
					<div className="hero-content text-center text-white bg-opacity-70 bg-black backdrop-blur-1 rounded-md p-5">
						<div className="max-w-md">
							<h1 className="mb-5 text-5xl" style={{ fontFamily: `'Protest Riot', sans-serif` }}>
								Explore the{" "}
								<span
									className="text-success relative"
									style={{ fontFamily: `'Protest Riot', sans-serif` }}
								>
									world
								</span>{" "}
								with{" "}
								<span
									className="text-success relative"
									style={{ fontFamily: `'Protest Riot', sans-serif` }}
								>
									{" "}
									exciting
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 63.10148 10.7553"
										className="absolute -bottom-5 left-0 w-full fill-success scale-y-50"
									>
										<path
											d="M4.7254,6.24385c.74953-1.16342,2.22421-1.09201,3.45417-1.15422,2.14741-.10861,4.31001-.0021,6.44273,.26458,4.19719,.52484,8.31108,1.63863,12.40424,2.67172,7.63368,1.92671,15.46314,3.64085,23.33831,2.18418,4.45051-.82321,8.45652-2.80963,12.00813-5.57625,1.06608-.83045,.87173-2.66381,0-3.53553-1.05239-1.05239-2.46666-.83262-3.53553,0-13.63069,10.61797-31.22921,.23514-46.05376-.92905C8.42712-.17285,3.06299-.40077,.40804,3.72026c-1.74782,2.71298,2.57851,5.22265,4.31735,2.5236h0Z"
											origin="undraw"
										/>
									</svg>
								</span>{" "}
								people
							</h1>
							<p className="mb-5 text-lg">Find your ideal company for your next adventure.</p>
							<button className="btn btn-primary text-lg text-white">Get Started</button>
						</div>
					</div>

					{/* top cutout */}
					<svg
						className="absolute top-0 text-base-100 rotate-180"
						style={{ translate: "0 -2px" }}
						viewBox="0 0 1000 100"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="currentColor"
							d="M 0 41.9679635331686 L 15.625 40.48781510781331 L 31.25 43.443712425738696 L 46.875 49.977979257589155 L 62.5 55.07711224605448 L 78.125 58.23226926082989 L 93.75 53.00478238585504 L 109.375 47.06114518939635 L 125 51.02948220045986 L 140.625 52.99097656139165 L 156.25 43.672120522540986 L 171.875 52.23884724533261 L 187.5 51.34849216545875 L 203.125 57.077894748198744 L 218.75 59.55523271071132 L 234.375 60.381575134258966 L 250 51.79897507147725 L 265.625 53.81877890452672 L 281.25 50.58476409215335 L 296.875 45.90118370785025 L 312.5 50.06115252933834 L 328.125 46.02599241210613 L 343.75 46.563592332582296 L 359.375 37.969719867256316 L 375 41.55899286105058 L 390.625 50.76413149581479 L 406.25 48.72012414036017 L 421.875 47.8026267918509 L 437.5 41.94680965701925 L 453.125 36.72700677436113 L 468.75 36.227888119958415 L 484.375 29.43209711164325 L 500 33.434165584248596 L 515.625 33.04772487368937 L 531.25 33.11695841965157 L 546.875 28.01601419641485 L 562.5 35.082306250360595 L 578.125 38.59307439655031 L 593.75 39.31476156598221 L 609.375 44.65748481240072 L 625 39.173237799224545 L 640.625 37.02899726485448 L 656.25 39.35943125695121 L 671.875 38.37741978097322 L 687.5 40.041774371047275 L 703.125 51.14901074670775 L 718.75 53.06837861817946 L 734.375 50.92658484283162 L 750 50.81731035805876 L 765.625 55.19905906145198 L 781.25 51.644668798518346 L 796.875 45.78934934237944 L 812.5 48.29159688125653 L 828.125 45.49456430701707 L 843.75 45.87980825796751 L 859.375 44.94095542473462 L 875 55.23951395872626 L 890.625 48.238951944142244 L 906.25 41.719971058917885 L 921.875 48.09307958205977 L 937.5 43.717879294475296 L 953.125 36.40735512453259 L 968.75 37.705669277089 L 984.375 47.25729071904956 L 1000 46.17489608729274 L 1000 100 L 0 100 Z"
						></path>
					</svg>

					{/* bottom cutout */}
					<svg
						className="absolute bottom-0 text-base-100"
						style={{ translate: "0 2px" }}
						viewBox="0 0 1000 100"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="currentColor"
							d="M 0 41.9679635331686 L 15.625 40.48781510781331 L 31.25 43.443712425738696 L 46.875 49.977979257589155 L 62.5 55.07711224605448 L 78.125 58.23226926082989 L 93.75 53.00478238585504 L 109.375 47.06114518939635 L 125 51.02948220045986 L 140.625 52.99097656139165 L 156.25 43.672120522540986 L 171.875 52.23884724533261 L 187.5 51.34849216545875 L 203.125 57.077894748198744 L 218.75 59.55523271071132 L 234.375 60.381575134258966 L 250 51.79897507147725 L 265.625 53.81877890452672 L 281.25 50.58476409215335 L 296.875 45.90118370785025 L 312.5 50.06115252933834 L 328.125 46.02599241210613 L 343.75 46.563592332582296 L 359.375 37.969719867256316 L 375 41.55899286105058 L 390.625 50.76413149581479 L 406.25 48.72012414036017 L 421.875 47.8026267918509 L 437.5 41.94680965701925 L 453.125 36.72700677436113 L 468.75 36.227888119958415 L 484.375 29.43209711164325 L 500 33.434165584248596 L 515.625 33.04772487368937 L 531.25 33.11695841965157 L 546.875 28.01601419641485 L 562.5 35.082306250360595 L 578.125 38.59307439655031 L 593.75 39.31476156598221 L 609.375 44.65748481240072 L 625 39.173237799224545 L 640.625 37.02899726485448 L 656.25 39.35943125695121 L 671.875 38.37741978097322 L 687.5 40.041774371047275 L 703.125 51.14901074670775 L 718.75 53.06837861817946 L 734.375 50.92658484283162 L 750 50.81731035805876 L 765.625 55.19905906145198 L 781.25 51.644668798518346 L 796.875 45.78934934237944 L 812.5 48.29159688125653 L 828.125 45.49456430701707 L 843.75 45.87980825796751 L 859.375 44.94095542473462 L 875 55.23951395872626 L 890.625 48.238951944142244 L 906.25 41.719971058917885 L 921.875 48.09307958205977 L 937.5 43.717879294475296 L 953.125 36.40735512453259 L 968.75 37.705669277089 L 984.375 47.25729071904956 L 1000 46.17489608729274 L 1000 100 L 0 100 Z"
						></path>
					</svg>
				</div>
			</header>
			{/* mountain svg from https://alistairshepherd.uk/writing/svg-generative-ridges/ */}
			{/* <svg
				viewBox="0 0 1000 100"
				preserveAspectRatio="none"
				xmlns="http://www.w3.org/2000/svg"
				className="text-base-100"
				style={{ translate: "0 -98%" }}
			>
				<path
					fill="black"
					d="M 0 64.36935513988686 L 15.625 55.98518403919095 L 31.25 50.298670947589855 L 46.875 52.51464665349761 L 62.5 51.61045995267414 L 78.125 48.456029543071324 L 93.75 50.19832828453011 L 109.375 52.865463044193646 L 125 53.974747005796225 L 140.625 62.18773875856297 L 156.25 59.288217381253105 L 171.875 52.95567704717938 L 187.5 59.4003011596116 L 203.125 63.16100418469494 L 218.75 59.080631780310185 L 234.375 57.0386614763204 L 250 62.48635062743469 L 265.625 55.38120278946781 L 281.25 53.45274021478337 L 296.875 58.08073332407553 L 312.5 60.75193921783188 L 328.125 58.89952848997902 L 343.75 65.27651168553652 L 359.375 60.687766283986385 L 375 59.08195254253971 L 390.625 61.37419309411886 L 406.25 63.909848673913835 L 421.875 63.53284415591031 L 437.5 57.39169384878138 L 453.125 56.51446444921026 L 468.75 60.33101131932409 L 484.375 59.65999550740255 L 500 49.96065720662896 L 515.625 43.36012820162173 L 531.25 43.711428223437046 L 546.875 39.889483764295605 L 562.5 42.96909603519607 L 578.125 34.83956677272647 L 593.75 39.524359356538525 L 609.375 44.34524596896813 L 625 49.0458896197679 L 640.625 45.576584934187004 L 656.25 40.438689382728384 L 671.875 39.09392661319249 L 687.5 46.51534749828013 L 703.125 47.786757567784825 L 718.75 45.55992046902508 L 734.375 48.047198731697506 L 750 59.495325038923134 L 765.625 55.631732091196916 L 781.25 51.594213998182454 L 796.875 56.33063015568017 L 812.5 53.5766451301737 L 828.125 50.111606502061804 L 843.75 50.22744261058596 L 859.375 51.650813290246944 L 875 44.72670234565942 L 890.625 46.17675967189431 L 906.25 36.03647344779262 L 921.875 33.92451896388545 L 937.5 42.48160130381874 L 953.125 45.50519399508787 L 968.75 37.78937089044462 L 984.375 47.10424780931578 L 1000 49.0313646812765 L 1000 100 L 0 100 Z"
				></path>
			</svg> */}
		</>
	);
};

export default Header;
