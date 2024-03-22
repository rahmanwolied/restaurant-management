import React from 'react';
export function Menu({}) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-1/3">
			<div className="text-xl font-semibold mb-4">Menu</div>
			<table className="table w-full">
				<thead>
					<tr>
						<th className="py-2 px-4">Product</th>
						<th className="py-2 px-4">Price</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
