const express = require('express');
const router = express.Router();

const order = require('./order.model');
const Product = require('./product.model');
const user = require('./user.model');

router.use('/order', order);
router.use('/product', Product);
router.use('/user', user);