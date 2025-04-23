// src/middleware/checkAuth.js
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader === 'Bearer token123') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};