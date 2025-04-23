const { body, validationResult } = require('express-validator');

exports.productCreateValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock').isInt({ gt: -1 }).withMessage('Stock must be 0 or greater'),
  body('category').optional().trim(),
  body('description').optional().trim()
];

exports.productUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock').optional().isInt({ gt: -1 }).withMessage('Stock must be 0 or greater'),
  body('category').optional().trim(),
  body('description').optional().trim()
];
exports.orderValidation = [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.productId').isInt({ gt: 0 }).withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be at least 1')
  ];