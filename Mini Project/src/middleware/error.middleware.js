/**
 * Middleware xử lý lỗi tập trung
 * - Bắt và xử lý tất cả các lỗi trong ứng dụng
 * - Log lỗi ra console
 * - Trả về response thân thiện với client
 */

const errorHandler = (err, req, res, next) => {
    // Log lỗi ra console để debug
    console.error('Error:', {
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body
    });
  
    // Xác định HTTP status code
    const statusCode = err.statusCode || 500;
    
    // Response thông báo lỗi (không trả về stack trace trong production)
    const response = {
      success: false,
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
  
    // Trả về response
    res.status(statusCode).json(response);
  };
  
  module.exports = errorHandler;