const express = require('express');
const router = express.Router();
const {toggleUserLock} = require('../controllers/admin.controler');


router.patch('/user/:id/lock', toggleUserLock);

module.exports = router;