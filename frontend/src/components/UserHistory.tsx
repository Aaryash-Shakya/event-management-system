import React from "react";

const UserHistory: React.FC = () => {
	return (
		<>
			<div className="w-full p-4">
				<div className="overflow-x-auto">
					<table className="table table-zebra">
						{/* head */}
						<thead className="text-lg">
							<tr>
								<th>Event Name</th>
								<th>Destination</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr className="hover:backdrop-brightness-95">
								<td>
									<div className="font-bold">Hart Hagerty</div>
								</td>
								<td>
									Zemlak, Daniel and Leannon
									<br />
									<span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
								</td>
								<td>
									<div className="flex items-center gap-3">
										<div>
											<div className="font-bold">Paid</div>
											<div className="text-sm opacity-50">cash</div>
										</div>
									</div>
								</td>
								<td>
									<button className="btn btn-info btn-sm me-4">details</button>
									<button className="btn btn-error btn-sm">cancel</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default UserHistory;
