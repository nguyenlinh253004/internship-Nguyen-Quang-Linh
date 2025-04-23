const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const {getAllProducts} = require('../controllers/productController');

router.get('/',checkAuth ,getAllProducts); // Lấy tất cả sản phẩm


module.exports = router;// Xuất router để sử dụng trong index.js
