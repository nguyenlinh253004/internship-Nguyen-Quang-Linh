const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Cấu hình JWT
const jwtSecret = process.env.JWT_SECRET || 'your_fallback_jwt_secret_key';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';

module.exports = {
  jwtSecret,
  jwtExpiresIn,

  /**
   * Tạo JWT token
   * @param {Object} payload - Dữ liệu đưa vào token (thường chứa userId, role...)
   * @returns {String} Token
   */
  generateToken: (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
  },

  /**
   * Xác thực JWT token
   * @param {String} token 
   * @returns {Object} Decoded token payload
   * @throws {Error} Nếu token không hợp lệ
   */
  verifyToken: (token) => {
    return jwt.verify(token, jwtSecret);
  },

  /**
   * Mã hóa password bằng bcrypt
   * @param {String} password 
   * @returns {String} Password đã hash
   */
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  /**
   * So sánh password với hash
   * @param {String} password 
   * @param {String} hashedPassword 
   * @returns {Boolean} Trùng khớp hay không
   */
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};