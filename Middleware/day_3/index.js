// index.js
const express = require('express');
const fs = require('fs');   
const path = require('path');
const morgan = require('morgan'); // Middleware log request

const productRoutes = require('./src/routes/productRoutes');
const logIp = require('./src/middleware/logIp');
const errorHandler = require('./src/middleware/errorHandle');

const app = express();
const PORT = 3000;
app.use(express.json()); // Dòng quan trọng!
// Middleware log morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'}); // Ghi đè vào file access.log

app.use(morgan('dev')); // Log to console
app.use(morgan('combined',{stream: accessLogStream})); // Log to file
app.set('trust proxy', true);
// Middleware log IP
app.use(logIp);

// Routes
app.use('/api/products', productRoutes);

// Middleware xử lý lỗi chung
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
