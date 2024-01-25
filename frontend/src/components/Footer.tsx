const Footer = () => {
	return (
		<>
			{/* mountain svg from https://alistairshepherd.uk/writing/svg-generative-ridges/ */}
			<svg viewBox="0 0 1000 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="currentColor"
					className="text-base-200"
					d="M 0 56.43453043266983 L 15.625 60.963575285244204 L 31.25 58.32511598956225 L 46.875 55.62350386940121 L 62.5 55.836860246848254 L 78.125 49.43160934705312 L 93.75 50.67664102494874 L 109.375 56.53345921621521 L 125 60.68572498555015 L 140.625 51.20858302958444 L 156.25 52.409813896599104 L 171.875 43.79339788529176 L 187.5 42.2226483269216 L 203.125 38.09752738286025 L 218.75 46.12732785272715 L 234.375 50.34561524218685 L 250 42.51063144289504 L 265.625 41.62391380251339 L 281.25 38.20066056353346 L 296.875 40.94129712948937 L 312.5 38.312949795078474 L 328.125 38.60166564869304 L 343.75 45.704400034118635 L 359.375 43.10383773965467 L 375 38.847615762636124 L 390.625 42.65677431416098 L 406.25 39.735575286341266 L 421.875 51.055396445414736 L 437.5 50.61479061111901 L 453.125 58.26497341358382 L 468.75 57.074128418040104 L 484.375 61.46784172000867 L 500 57.11496456911936 L 515.625 56.49713019932967 L 531.25 57.60436950985862 L 546.875 51.09182348287521 L 562.5 50.46135562038698 L 578.125 58.11453932892824 L 593.75 57.9431577328623 L 609.375 55.608803973899455 L 625 63.663035952002524 L 640.625 63.31149833955017 L 656.25 67.46807785221587 L 671.875 74.50638613556518 L 687.5 77.0834541492533 L 703.125 80.4082650693738 L 718.75 76.23908788800433 L 734.375 72.30572961266772 L 750 77.76453922100066 L 765.625 80.15461875477602 L 781.25 78.17067241126433 L 796.875 74.02399851526468 L 812.5 71.16333089977205 L 828.125 77.13098958916522 L 843.75 71.9643351256581 L 859.375 73.81173532605536 L 875 76.60858267682056 L 890.625 71.05318334654608 L 906.25 71.72755324041627 L 921.875 70.53800506926102 L 937.5 78.49910978884934 L 953.125 79.18864710025663 L 968.75 76.78631664609486 L 984.375 72.65680347466419 L 1000 68.56382050302818 L 1000 100 L 0 100 Z"
				></path>
			</svg>
			<footer className="footer p-10 bg-base-200 text-base-content">
				<aside>
					<img
						src="../../public/hike-link-vertical-logo/png/logo-no-background.png"
						alt=""
						width={"200px"}
						className="object-cover"
					/>
					<p className="text-md">
						<span className="font-semibold">Hike Link Ltd.</span>
						<br />
						Copyright © 2024 - All right reserved
					</p>
				</aside>
				<nav>
					<header className="footer-title">Services</header>
					<a className="link link-hover">Branding</a>
					<a className="link link-hover">Design</a>
					<a className="link link-hover">Marketing</a>
					<a className="link link-hover">Advertisement</a>
				</nav>
				<nav>
					<header className="footer-title">Company</header>
					<a className="link link-hover">About us</a>
					<a className="link link-hover">Contact</a>
					<a className="link link-hover">Jobs</a>
					<a className="link link-hover">Press kit</a>
				</nav>
				<nav>
					<header className="footer-title">Legal</header>
					<a className="link link-hover">Terms of use</a>
					<a className="link link-hover">Privacy policy</a>
					<a className="link link-hover">Cookie policy</a>
				</nav>
			</footer>
		</>
	);
};

export default Footer;
