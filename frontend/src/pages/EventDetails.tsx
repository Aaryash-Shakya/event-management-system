import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import serverUrl from "../config";
import { EventData } from "../components/Event";
import { FaShoePrints } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { GoShareAndroid } from "react-icons/go";

const EventDetails: React.FC = () => {
	const param = useParams();
	const eventId = param.event_id;
	const [event, setEvent] = useState({} as EventData);
	useEffect(() => {
		axios
			.get(`${serverUrl}/api/event/get-event/` + eventId)
			.then(res => setEvent(res.data.event))
			.catch(err => console.log(err));
	}, []);
	return (
		<>
			<div className="bg-base-100 py-5">
				<div className="container bg-base-100 max-w-4xl min-h-screen mx-auto rounded-lg overflow-hidden shadow-md">
					<div
						className="image-box h-96 w-full flex flex-col justify-end"
						style={{
							backgroundImage: `url(../../public/photos/bagpack.jpg)`,
							backgroundAttachment: "scroll",
							backgroundPosition: "center",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
						}}
					>
						<div className="image-data p-4 h-auto flex justify-between drop-shadow bg-black bg-opacity-20">
							<div className="left flex flex-col justify-evenly items-start">
								<h1 className="text-4xl text-white">{event.title}</h1>
								<p className="text-white">
									{event.difficulty} . {event.duration}
								</p>
								<p className="text-white text-lg underline">{event.destination}</p>
							</div>
							<div className="right">
								<div className="btn btn-circle p-8 grid place-content-center bg-zinc-600 bg-opacity-50 text-white text-lg border-0">
									{event.current_participants}/{event.maximum_participants}
								</div>
							</div>
						</div>
						<div className="image-nav h-20 text-lg flex justify-evenly items-center bg-black bg-opacity-40">
							<div className="w-1/3 h-full flex justify-center items-center gap-2 cursor-pointer">
								<div className="rounded-full bg-white p-3">
									<FaShoePrints className="text-black text-2xl" />
								</div>
								<p className="text-white text-xl">Join</p>
							</div>
							<div className="w-1/3 h-full flex justify-center items-center gap-2 cursor-pointer">
								<div className="rounded-full bg-white p-3">
									<GrGroup className="text-black text-2xl" />
								</div>
								<p className="text-white text-xl">Participants</p>
							</div>
							<div className="w-1/3 h-full flex justify-center items-center gap-2 cursor-pointer">
								<div className="rounded-full bg-white p-3">
									<GoShareAndroid className="text-black text-2xl" />
								</div>
								<p className="text-white text-xl">Share</p>
							</div>
						</div>
					</div>
					<div className="data-box">
						<h2 className="h-auto w-full md:p-6 p-3 font-semibold text-xl border-b border-t border-black">
							Details
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 grid-flow-col gap-4 md:p-6 p-3">
							<div className="details-box text-center">
								<p className="text-gray-700">Event Date</p>
								<p className="text-black text-lg">
									{new Date(event.start_date).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
										hour12: true,
									})}
								</p>
							</div>
							<div className="details-box text-center">
								<p className="text-gray-700">Meetup Point</p>
								<p className="text-black text-lg">{event.gathering_point}</p>
							</div>
							<div className="details-box text-center">
								<p className="text-gray-700">Duration</p>
								<p className="text-black text-lg">{event.duration}</p>
							</div>
							<div className="details-box text-center">
								<p className="text-gray-700">Status</p>
								<p className="text-black text-lg">{event.status}</p>
							</div>
						</div>
                        <p className="p-3 md:p-6">{event.description}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default EventDetails;
