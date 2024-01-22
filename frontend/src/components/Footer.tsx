import React from "react";

const Footer = () => {
	return (
		<>
			<footer className="footer p-10 bg-base-200 text-base-content">
				<aside>
					<img src="../../public/hike-link-vertical-logo/png/logo-no-background.png" alt="" width={"200px"} className="object-cover"/>
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
