const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { orderValidation } = require('../middleware/validate.middleware');

// User routes
router.post('/', authenticate, orderValidation, createOrder);
router.get('/', authenticate, getUserOrders);

// Admin routes
router.get('/admin/orders', authenticate, authorize('admin'), getAllOrders);
router.patch('/admin/orders/:id/status', authenticate, authorize('admin'), updateOrderStatus);

module.exports = router;