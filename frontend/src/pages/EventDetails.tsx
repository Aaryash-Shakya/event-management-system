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
			<div className="container max-w-4xl min-h-screen mx-auto bg-red-200 mt-4 rounded-lg overflow-hidden">
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
				<div className="data-box"></div>
			</div>
		</>
	);
};

export default EventDetails;
