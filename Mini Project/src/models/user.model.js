const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users');
    return rows;
  }

  static async toggleLock(id) {
    const [user] = await db.query('SELECT role FROM users WHERE id = ?', [id]);
    if (!user) return null;
    
    const newRole = user.role === 'locked' ? 'user' : 'locked';
    await db.query('UPDATE users SET role = ? WHERE id = ?', [newRole, id]);
    return newRole;
  }

  static async findById(id){
    const [rows] = await db.query( 'SELECT * FROM users WHERE id = ?',[id]);
    return rows[0];
  }

  static async updateRole(id, newRole) {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [newRole, id]);
  }

}

module.exports = User;