import { Menu } from './Menu';
import { RecentOrders } from './RecentOrders';
import Sidebar from './Sidebar';
import 'boxicons/css/boxicons.min.css';
import { useEffect, useState } from 'react';

const Admin = () => {
	const [orders, setOrders] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [products, setProducts] = useState([]);
	const [orderLoading, setOrderLoading] = useState(true);
	const [customerLoading, setCustomerLoading] = useState(true);
	const [productLoading, setProductLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [statusLoading, setStatusLoading] = useState(false);

	async function handleConfirm(id, user, status) {
		try {
			setStatusLoading(true);
			// user.email and user.name in the request body
			const response = await fetch(`http://localhost:3001/api/orders/confirm/${id}?status=${status}`, {
				headers: {
					Authorization: 'Bearer ' + user.refreshToken,
				},
			});
			const json = await response.json();
			if (json.success) {
				setOrders(json.payload.orders);
				setStatusLoading(false);
			}
			console.log('Order confirmed:', json);
		} catch (error) {
			console.error('Error confirming order:', error);
		}
	}

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		console.log('user:', user);
		setUser(user);
		fetchAllCustomers('', user).then((customers) => {
			setCustomers(customers);
			setCustomerLoading(false);
		});
		fetchAllOrders(user).then((orders) => {
			setOrders(orders);
			setOrderLoading(false);
		});
		fetchAllProducts(user).then((products) => {
			setProducts(products);
			setProductLoading(false);
		});
	}, []);
	return (
		<>
			<Sidebar />
			<section className="ml-60 bg-gray-200 min-h-screen transition-all duration-500 ease-in-out pt-5 px-5">
				<div className="flex justify-between flex-wrap mb-6">
					<TotalOrders ordersNumber={orders.length} orderLoading={orderLoading} />
					<TotalCustomers customerNumber={customers.length} customerLoading={customerLoading} />
				</div>

				<div className="flex justify-between">
					<RecentOrders
						orders={orders}
						orderLoading={orderLoading}
						handleConfirm={handleConfirm}
						user={user}
						statusLoading={statusLoading}
					/>
					<Menu products={products} productLoading={productLoading} />
				</div>
			</section>
		</>
	);
};

export default Admin;

function TotalOrders({ ordersNumber, orderLoading }) {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md flex items-center w-1/2 md:w-1/4 mb-4 md:mb-0">
			<div className="text-3xl font-bold mr-4" id="total-orders"></div>
			<div className="flex gap-2 items-center ">
				{orderLoading ? (
					<span className="loading loading-bars loading-sm"></span>
				) : (
					<div className="text-xl py-1 px-3 rounded-md bg-gray-200">{ordersNumber}</div>
				)}
				<div className="text-lg font-semibold">Total Orders</div>
				<div className="flex items-center text-green-500 text-xl">
					<i className="bx bx-up-arrow-alt"></i>
				</div>
			</div>
			<i className="bx bx-cart-alt text-3xl ml-auto text-gray-500"></i>
		</div>
	);
}

function TotalCustomers({ customerNumber, customerLoading }) {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md flex items-center w-1/2 md:w-1/4 mb-4 md:mb-0">
			<div className="text-3xl font-bold mr-4" id="total-customers"></div>
			<div className="flex gap-2 items-center">
				{(customerLoading && <span className="loading loading-bars loading-sm"></span>) || (
					<div className="text-xl py-1 px-3 rounded-md bg-gray-200">{customerNumber}</div>
				)}
				<div className="text-lg font-semibold">Total Customers</div>
				<div className="flex items-center text-green-500">
					<i className="bx bx-up-arrow-alt"></i>
				</div>
			</div>
			<i className="bx bxs-cart-add text-3xl ml-auto text-green-500"></i>
		</div>
	);
}

async function convertDate(originalDateString) {
	const date = new Date(originalDateString);

	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return date.toLocaleDateString('en-US', options);
}

async function fetchAllCustomers(customerId, user) {
	try {
		const response = await fetch(`http://localhost:3001/api/users/get/${customerId}`, {
			headers: {
				Authorization: 'Bearer ' + user.refreshToken,
			},
		});
		const json = await response.json();
		console.log(json);
		return json.payload.users;
	} catch (error) {
		console.error('Error fetching customer name:', error);
	}
}

async function fetchAllOrders(admin) {
	try {
		const response = await fetch('http://localhost:3001/api/orders/');
		const json = await response.json();
		return json.payload.orders;
	} catch (error) {
		console.error('Error fetching total orders:', error);
	}
}

async function fetchAllProducts(user) {
	try {
		const response = await fetch('http://localhost:3001/api/products/', {
			headers: {
				Authorization: 'Bearer ' + user.refreshToken,
			},
		});
		const json = await response.json();
		return json.payload;
	} catch (error) {
		console.error('Error fetching total products:', error);
	}
}
