const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { handleGetAllOrders, handleGetOrders, handleUpdateOrder, handleConfirmOrder } = require('../controllers/order.controller');
const router = express.Router();

router.get('/', handleGetAllOrders);
router.get('/:id', isLoggedIn, handleGetOrders);
router.get('/confirm/:orderId', isLoggedIn, isAdmin, handleConfirmOrder);
router.post('/update', isLoggedIn, isAdmin, handleUpdateOrder);

module.exports = router;
