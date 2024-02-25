import React from "react";
import { FaRegCalendar, FaRegCalendarPlus } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiDraftFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminSidebar: React.FC = () => {
	return (
		<>
			<ul className="menu bg-base-200 fixed top-0 left-0 pt-20 h-screen gap-2">
				<li>
					<Link to="/admin/all-events" className="tooltip tooltip-right" data-tip="All Event">
						<FaRegCalendar size={30} />
					</Link>
				</li>
				<li>
					<Link to="/admin/add-event" className="tooltip tooltip-right" data-tip="Add Event">
						<FaRegCalendarPlus size={30} />
					</Link>
				</li>
				<li>
					<Link to="/admin/draft-events" className="tooltip tooltip-right" data-tip="Drafts">
						<RiDraftFill size={30} />
					</Link>
				</li>
				<li>
					<Link to="/admin/manage-users" className="tooltip tooltip-right" data-tip="Manage User">
						<FaUserGear size={30} />
					</Link>
				</li>
				<li>
					<Link to="/admin/add-event" className="tooltip tooltip-right" data-tip="Stats">
						<IoStatsChartSharp size={30} />
					</Link>
				</li>
			</ul>
		</>
	);
};

export default AdminSidebar;
