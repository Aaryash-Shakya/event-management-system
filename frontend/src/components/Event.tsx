import React from "react";

const Event = () => {
	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 inline-block p-4">
			<div className="card card-compact bg-base-100 shadow-xl">
				<figure>
					<img src="../../public/photos/bagpack.jpg" alt="Shoes" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Sagarmatha Hike</h2>
					<p>Is it possible to hike to summit of sagarmtha?</p>
					<div className="card-actions justify-end">
						<button className="btn btn-primary">Join Now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Event;
