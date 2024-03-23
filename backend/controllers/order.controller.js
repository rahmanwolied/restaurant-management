const path = require('path');
const createError = require('http-errors');
const Order = require('../models/order.model');
const { successResponse } = require('./response.controller');
const { findWithId } = require('../services/findItem.service');
const { sendEmail } = require('../helpers/email');
//handleGetAllOrders, handleGetOrders, handleUpdateOrder

const handleGetAllOrders = async (req, res, next) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		const count = await Order.find().countDocuments();

		if (!count) {
			console.log('Order does not exist');
			throw createError(404, 'Order does not exist');
		}

		return successResponse(res, {
			statusCode: 200,
			message: 'Orders fetched successfully',
			payload: {
				orders,
			},
		});
	} catch (error) {
		next(error);
	}
};

const handleConfirmOrder = async (req, res, next) => {
	try {
		const { orderId } = req.params;
		const { status } = req.query;
		console.log(orderId);
		const order = await Order.findById(orderId);
		const { email, name } = order.user;
		console.log(order);
		if (!order) {
			throw createError(404, 'Order does not exist');
		}
		order.status = status;
		await order.save();
		const emailTemplate = {
			email,
			subject: 'Order Status Update',
			html: `
			<h2>Hello ${name}!</h2>
			<p>Your order ${orderId} has been ${status} by the admin.${
				status === 'Confirmed' ? ' Expect delivery within 2-3 business days.' : ' Please order again or contact the admins.'
			}</p>`,
		};
		const emailTemplate2 = {
			email: 'mosheur.r.wolied@gmail.com',
			subject: 'Order Status Update',
			html: `
			<h2>Hello ${name}!</h2>
			<p>Your order ${orderId} has been ${status} by the admin.${
				status === 'Confirmed' ? ' Expect delivery within 2-3 business days.' : ' Please order again or contact the admins.'
			}</p>`,
		};

		try {
			await sendEmail(emailTemplate);
			await sendEmail(emailTemplate2);
		} catch (error) {
			console.log(error);
			next(createError(500, 'Error sending email'));
			return;
		}
		const orders = await Order.find().sort({ createdAt: -1 });
		return successResponse(res, {
			statusCode: 200,
			message: 'Order confirmed successfully',
			payload: { orders },
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const handleGetOrders = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(Order, id, options);

		return successResponse(res, {
			statusCode: 200,
			message: 'Order fetched successfully',
			payload: { user },
		});
	} catch (error) {
		next(error);
	}
};

const handleUpdateOrder = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = { password: 0 };
		const user = await findWithId(Order, id, options);

		// deleting image of the deleted user
		if (user.image !== 'avatar-default-icon.png') {
			const userImagePath = path.join('public', 'images', 'orders', user.image);
			console.log(userImagePath);
			deleteImage(userImagePath);
		} else {
			console.log('Order image is default image');
		}

		await Order.findByIdAndDelete({
			_id: id,
			isAdmin: false,
		});

		return successResponse(res, {
			statusCode: 200,
			message: 'Order deleted successfully',
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { handleGetAllOrders, handleGetOrders, handleUpdateOrder, handleConfirmOrder };
