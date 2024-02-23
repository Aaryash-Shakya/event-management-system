import React from "react";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";

const AdminSidebar: React.FC = () => {
	return (
		<>
			<ul className="menu bg-base-200 fixed top-0 left-0 pt-20 h-screen gap-2">
				<li>
					<a className="tooltip tooltip-right" data-tip="Add Event">
						<FaRegCalendarPlus size={30} />
					</a>
				</li>
				<li>
					<a className="tooltip tooltip-right" data-tip="Update Event">
						<MdEditCalendar size={30} />
					</a>
				</li>
				<li>
					<a className="tooltip tooltip-right" data-tip="Drafts">
						<RiDraftFill size={30} />
					</a>
				</li>
				<li>
					<a className="tooltip tooltip-right" data-tip="Manage User">
						<FaUserGear size={30} />
					</a>
				</li>
				<li>
					<a className="tooltip tooltip-right" data-tip="Stats">
						<IoStatsChartSharp size={30} />
					</a>
				</li>
				
			</ul>
		</>
	);
};

export default AdminSidebar;
