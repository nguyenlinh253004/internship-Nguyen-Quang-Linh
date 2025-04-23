# Node.js Project Setup

## 1. Cấu trúc dự án

```
project-folder/
├── node_modules/
├── public/
├── src/
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   ├── checkAuth.js
│   │   ├── logIp.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── product.js
│   └── routes/
│       └── productRoutes.js
├── .gitignore
├── access.log
├── package.json
├── index.js
└── README.md
```

## 2. Cài đặt các gói cần thiết

Chạy các lệnh sau để khởi tạo dự án và cài đặt các phụ thuộc:

```bash
npm init -y
npm install express morgan
```

## 3. Middleware

### 3.1 `checkAuth.js`

```javascript
// src/middleware/checkAuth.js
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'Bearer token123') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
```

### 3.2 `logIp.js`

```javascript
// src/middleware/logIp.js
module.exports = (req, res, next) => {
    console.log(`User IP: ${req.ip}`);
    next();
};
```

### 3.3 `errorHandler.js`

```javascript
// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: 'Something went wrong!',
            details: err.message
        }
    });
};
```

## 4. Ghi log request với Morgan

```javascript
// index.js
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const productRoutes = require('./src/routes/productRoutes');
const logIp = require('./src/middleware/logIp');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = 3000;

// Middleware ghi log request
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('dev')); // hoặc 'combined', 'tiny'
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware ghi log IP
app.use(logIp);

// Routes
app.use('/api/products', productRoutes);

// Middleware xử lý lỗi toàn cục
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

## 5. Routes và Controllers

### 5.1 `productRoutes.js`

```javascript
// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const { getAllProducts } = require('../controllers/productController');

router.get('/', checkAuth, getAllProducts);

module.exports = router;
```

### 5.2 `productController.js`

```javascript
// src/controllers/productController.js
exports.getAllProducts = (req, res) => {
    res.json([
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' }
    ]);
};
```
### Đây là các log được in ra  sau chạy node khi sử dụng morgan
- terminal:

![alt text](screenshot/image2.png)

- file access.log:
![alt text](screenshot/image3.png)
## 6. Kiểm thử API

Sử dụng Postman hoặc curl để gửi request:

- Gửi request đến: `GET http://localhost:3000/api/products`
- Không có header: nhận được `{ "message": "Unauthorized" }`
- Có header `Authorization: Bearer token123`: nhận được danh sách sản phẩm

### Ảnh minh hoạ kiểm thử:

- Request thành công với token:
  ![alt text](screenshot/image-1.png)
- Request thất bại với token:
  ![alt text](screenshot/image.png)

## 7. Ghi chú

- Kiểm tra từng file sau khi viết để đảm bảo hoạt động.
- Sử dụng `node index.js`  để chạy server và xác minh thiết lập.
- Đảm bảo xử lý lỗi và ghi log đúng cách cho môi trường production.
- Thay thế `Bearer token123` trong `checkAuth.js` bằng token bảo mật cho môi trường production.
- Thêm các routes và controllers khác nếu cần cho ứng dụng của bạn.
- Giữ file `access.log` an toàn và theo dõi kích thước file định kỳ.
- Sử dụng `.gitignore` để loại trừ các file hoặc thư mục nhạy cảm khỏi kiểm soát phiên bản.
- Tuân thủ các best practices trong phát triển Node.js.