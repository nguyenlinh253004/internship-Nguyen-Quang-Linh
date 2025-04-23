const Order = require('../models/order.model');
const Product = require('../models/product.model');
const db = require('../config/db');

exports.createOrder = async (req, res, next) => {
  const transaction = await db.getConnection();
  try {
    await transaction.beginTransaction();
    
    const userId = req.user.id
    const { items } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Order items are required');
    }

    // Calculate total and validate products
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }
      totalPrice += product.price * item.quantity;
    }

    // Create order
    const orderId = await Order.create(userId, totalPrice);

    // Add order items
    for (const item of items) {
      const product = await Product.findById(item.productId);
      await Order.addOrderItem(orderId, item.productId, item.quantity, product.price);
      
      // Reserve stock (will be updated when order is confirmed)
      await Order.updateProductStock(item.productId, item.quantity);
    }

    await transaction.commit();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findByUser(userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  const transaction = await db.getConnection();
  try {
    await transaction.beginTransaction();
    
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'paid', 'shipped', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    await Order.updateStatus(id, status);
    
    // If order is cancelled, restore stock
    if (status === 'cancelled') {
      const orderItems = await Order.getOrderItems(id);
      for (const item of orderItems) {
        await Product.increaseStock(item.product_id, item.quantity);
      }
    }

    await transaction.commit();
    
    res.json({
      success: true,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};