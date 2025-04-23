const db = require('../config/db');

class Order {
  static async create(userId, totalPrice) {
    const [result] = await db.query(
      'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
      [userId, totalPrice, 'pending']
    );
    return result.insertId;
  }

  static async addOrderItem(orderId, productId, quantity, price) {
    await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [orderId, productId, quantity, price]
    );
  }

  static async findByUser(userId) {
    const [orders] = await db.query(
      `SELECT o.*, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id`,
      [userId]
    );
    return orders;
  }

  static async findAll() {
    const [orders] = await db.query(
      `SELECT o.*, u.name as user_name,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price
        )
      ) AS items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN users u ON o.user_id = u.id
      GROUP BY o.id`
    );
    return orders;
  }

  static async updateStatus(id, status) {
    await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  static async updateProductStock(productId, quantity) {
    await db.query(
      'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
      [quantity, productId, quantity]
    );
  }
}

module.exports = Order;