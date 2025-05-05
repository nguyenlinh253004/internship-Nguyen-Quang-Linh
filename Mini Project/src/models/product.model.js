const db = require('../config/db');

class Product{
    static async findAll({ page = 1, limit = 10, search = '', category = '' }) {
        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];
    
        if (search) {
          query += ' AND name LIKE ?';
          params.push(`%${search}%`);
        }
    
        if (category) {
          query += ' AND category = ?';
          params.push(category);
        }
    
        query += ' ORDER BY id ASC LIMIT ? OFFSET ?';
        params.push(limit, offset);
    
        const [products] = await db.query(query, params);
        return products;
      }
    
      static async findById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
      }
    
      static async create({ name, price, stock, description, category }) {
        const [result] = await db.query(
          'INSERT INTO products (name, price, stock, description, category) VALUES (?, ?, ?, ?, ?)',
          [name, price, stock, description, category]
        );
        return result.insertId;
      }
    
      static async update(id, { name, price, stock, description, category }) {
        await db.query(
          'UPDATE products SET name = ?, price = ?, stock = ?, description = ?, category = ? WHERE id = ?',
          [name, price, stock, description, category, id]
        );
      }
    
      static async delete(id) {
        await db.query('DELETE FROM products WHERE id = ?', [id]);
      }
    
      static async count({ search = '', category = '' }) {
        let query = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
        const params = [];
    
        if (search) {
          query += ' AND name LIKE ?';
          params.push(`%${search}%`);
        }
    
        if (category) {
          query += ' AND category = ?';
          params.push(category);
        }
    
        const [rows] = await db.query(query, params);
        return rows[0].total;
      }

      static async increaseStock(productId, quantity) {
        await db.query(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [quantity, productId]
        );
      }
}

module.exports = Product;