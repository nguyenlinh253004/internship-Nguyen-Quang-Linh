const Product = require('../models/product.model');
const { validationResult } = require('express-validator');

exports.getAllProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    
    const products = await Product.findAll({ 
      page: parseInt(page), 
      limit: parseInt(limit), 
      search, 
      category 
    });
    
    const total = await Product.count({ search, category });
    
    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, stock, description, category } = req.body;
    const productId = await Product.create({ name, price, stock, description, category });
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      productId
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, price, stock, description, category } = req.body;
    
    await Product.update(id, { name, price, stock, description, category });
    
    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};