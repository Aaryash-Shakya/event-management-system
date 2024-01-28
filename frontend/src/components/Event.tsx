const Event = () => {
	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 inline-block p-4">
			<div className="card card-compact bg-base-100 shadow-xl">
				<figure className="rounded-xl">
					<img src="../../public/photos/bagpack.jpg" className="hover:scale-110 ease-out duration-500" alt="Bagpack" />
				</figure>
				<div className="card-body text-primary">
					<h2 className="card-title">Sagarmatha Hike</h2>
					<p className="description">Is it possible to hike to summit of sagarmtha?</p>
					<p>
						<span className="difficulty">Moderate</span> .<span className="duration">10 hours</span>
					</p>
					<div className="card-actions flex items-center justify-between">
						<span className="date">2024 Jan 30</span>
						<button className="btn btn-primary">Join Now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Event;
