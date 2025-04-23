require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./src/config/db');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middleware/error.middleware');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('screenshot'));

// ✅ Kiểm tra kết nối database trước khi khởi động server
db.query('SELECT 1')
  .then(() => console.log('✅ Connected to database'))
  .catch((error) => {
    console.error('❌ Database connection error:', error);
    process.exit(1); // Dừng app nếu kết nối DB thất bại
  });

// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
