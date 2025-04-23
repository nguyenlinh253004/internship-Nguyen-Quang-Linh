const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
// router.patch('/register', authenticate);
// router.patch('/login', authorize);

module.exports = router;