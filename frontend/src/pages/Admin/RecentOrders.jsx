export function RecentOrders({}) {
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
					</tr>
				</thead>

				<div className="flex flex-col gap-4 w-52">
					<div className="skeleton h-4 w-full"></div>
					<div className="skeleton h-4 w-full"></div>
				</div>
			</table>
			<div className="mt-4 text-right">
				<button id="seeAllOrders" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
					See All
				</button>
			</div>
		</div>
	);
}
