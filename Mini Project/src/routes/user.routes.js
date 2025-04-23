const express = require('express');
const router = express.Router();
const {getAllUsers } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.get('/user', getAllUsers);

module.exports = router;