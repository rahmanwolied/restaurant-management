export function RecentOrders({ orders, orderLoading }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-2/3 mr-4">
			<div className="text-xl font-semibold mb-4">Recent Orders</div>
			<table className="table w-full">
				<thead>
					<tr>
						<th className="py-2 px-4">Order #</th>
						<th className="py-2 px-4">Date</th>
						<th className="py-2 px-4">Customer</th>
						<th className="py-2 px-4">Total</th>
						<th className="py-2 px-4">Status</th>
						<th className="py-2 px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{orderLoading ? (
						<>
							<tr>
								<td colSpan="5">
									<div className="skeleton h-4 w-full"></div>
								</td>
							</tr>
							<tr>
								<td colSpan="5">
									<div className="skeleton h-4 w-full"></div>
								</td>
							</tr>
						</>
					) : (
						orders.map((order) => (
							<tr key={order._id}>
								<td className="py-2 px-4">{order._id}</td>
								<td className="py-2 px-4">{order.createdAt}</td>
								<td className="py-2 px-4">{order.user.name}</td>
								<td className="py-2 px-4">৳{order.total}</td>
								<td className="py-2 px-4">{order.status}</td>
								<td>
									<div>
										<button className="bg-green-500 hover:bg-green-600 hover:scale-110 text-white rounded-lg btn">
											<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="m10 15.586l-3.293-3.293l-1.414 1.414L10 18.414l9.707-9.707l-1.414-1.414z"
												/>
											</svg>
										</button>
										<button className="bg-red-500 hover:bg-red-600 hover:scale-110 text-white rounded-lg btn">
											<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 72 72">
												<path
													fill="#ea5a47"
													d="m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.217 36l-14.36 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z"
												/>
												<path
													fill="white"
													stroke="white"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeMiterlimit="10"
													strokeWidth="2"
													d="m58.14 21.78l-7.76-8.013l-14.29 14.22l-14.22-14.22l-8.013 8.013L28.207 36l-14.35 14.22l8.014 8.013l14.22-14.22l14.29 14.22l7.76-8.013L43.921 36z"
												/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<div className="mt-4 text-right">
				<button id="seeAllOrders" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
					See All
				</button>
			</div>
		</div>
	);
}
