// src/middleware/logIp.js
module.exports = (req, res, next) => {
  console.log(`IP Address: ${req.ip}`);
   next(); // Call the next middleware or route handler
 };