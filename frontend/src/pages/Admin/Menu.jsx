import React from 'react';
export function Menu({ products, productLoading }) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-1/3">
			<div className="text-xl font-semibold mb-4">Top Selling</div>
			<table className="table w-full">
				<thead>
					<tr>
						<th className="py-2 px-4">Product</th>
						<th className="py-2 px-4">Sold</th>
					</tr>
				</thead>
				<tbody>
					{productLoading ? (
						<>
							<tr>
								<td>
									<div className="skeleton h-4 w-full"></div>
								</td>
								<td>
									<div className="skeleton h-4 w-full"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="skeleton h-4 w-full"></div>
								</td>
								<td>
									<div className="skeleton h-4 w-full"></div>
								</td>
							</tr>
						</>
					) : (
						products
							.sort((a, b) => b.sold - a.sold)
							.map((product) => (
								<tr key={product._id}>
									<td className="py-2 px-4">{product.name}</td>
									<td className="py-2 px-4">{product.sold}</td>
								</tr>
							))
					)}
				</tbody>
			</table>
		</div>
	);
}
