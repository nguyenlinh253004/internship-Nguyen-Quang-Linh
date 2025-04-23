const express = require('express');
const router = express.Router();
const { 
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const { 
  productCreateValidation,
  productUpdateValidation
} = require('../middleware/validate.middleware');

// Public routes
router.get('/', getAllProducts);

// Admin routes
router.post('/admin/products', authenticate, authorize('admin'), productCreateValidation, createProduct);
router.put('/admin/products/:id', authenticate, authorize('admin'), productUpdateValidation, updateProduct);
router.delete('/admin/products/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;