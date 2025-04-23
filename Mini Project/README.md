Mini Project – Order Management System

### Mục tiêu
Xây dựng một hệ thống backend để quản lý đơn hàng, sản phẩm và người dùng. Người dùng có thể đăng ký, đăng nhập, đặt hàng. Admin có thể theo dõi và cập nhật trạng thái đơn hàng.

### Giải thích hệ thống
Đây là một hệ thống backend quản lý đơn hàng với các chức năng chính:

- **Authentication**: Đăng ký, đăng nhập người dùng với JWT.
- **Quản lý người dùng**: Admin có thể xem danh sách và khóa/mở tài khoản.
- **Quản lý sản phẩm**: CRUD sản phẩm với phân trang, tìm kiếm.
- **Quản lý đơn hàng**: Tạo đơn hàng, xem lịch sử, cập nhật trạng thái.
- **Middleware**: Xác thực, phân quyền, validate dữ liệu.
- **Logging**: Ghi log request và lỗi.
## Có thể dành cho mọi người
## 📦 Cài đặt

1. **Clone dự án**:
   ```bash
   git clone https://github.com/yourusername/order-management-system.git
   cd Mini Project
   npm i để tải các package để cấu hình.
### Triển khai chi tiết
#### Thiết lập dự án
  * Cài đặt những Framework and thư viện sau trong dự án
```bash
npm init -y
npm install express mysql2 bcryptjs jsonwebtoken morgan dotenv cors
npm install nodemon --save-dev
```

#### Giải thích các Framework and thư viện:
- **express**: Framework để xây dựng ứng dụng web và API.
- **mysql2**: Thư viện để kết nối và làm việc với cơ sở dữ liệu MySQL.
- **bcryptjs**: Thư viện để mã hóa mật khẩu.
- **jsonwebtoken**: Thư viện để tạo và xác thực JSON Web Tokens (JWT) cho việc đăng nhập.
- **morgan**: Middleware để ghi log các request HTTP.
- **dotenv**: Thư viện để quản lý các biến môi trường từ file `.env`.
- **cors**: Middleware để xử lý CORS (Cross-Origin Resource Sharing).
- **nodemon**: Công cụ phát triển để tự động khởi động lại server khi có thay đổi trong mã nguồn.

### Cấu trúc dự án

 * Cấu trúc folder

```
├── screenshot/               # Chứa các file tĩnh như ảnh
|
├── src/
│   ├── controllers/          # Thư mục chứa các controller
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── middleware/           # Thư mục chứa các middleware
│   │   ├── auth.middleware.js    # JWT verify, role check
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js
│   ├── models/               # Thư mục chứa các model
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   └── index.js              # Load toàn bộ model nếu cần
│   ├── routes/               # Thư mục chứa các route
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   └── index.js              # Gộp tất cả route lại
│   ├── utils/                # Thư mục chứa các tiện ích
│   │   └── jwt.js                # Generate token, hash, etc
│   ├── app.js                # File chính khởi động ứng dụng
│   └── .env                  # File cấu hình biến môi trường
├── package.json              # File cấu hình dự án
└── README.md                 # File hướng dẫn
```
### Cấu trúc cơ sở dữ liệu

### Gợi ý cấu trúc cơ sở dữ liệu:

#### Bảng `users`
| Tên cột      | Kiểu dữ liệu | Ghi chú                     |
|--------------|--------------|-----------------------------|
| `id`         | Primary Key  |                             |
| `name`       | VARCHAR      | Tên người dùng              |
| `email`      | VARCHAR      | Email người dùng            |
| `password`   | VARCHAR      | Mật khẩu đã mã hóa          |
| `role`       | ENUM         | `'user'` hoặc `'admin'`     |
| `created_at` | TIMESTAMP    | Thời gian tạo tài khoản     |

#### Bảng `products`
| Tên cột      | Kiểu dữ liệu | Ghi chú                     |
|--------------|--------------|-----------------------------|
| `id`         | Primary Key  |                             |
| `name`       | VARCHAR      | Tên sản phẩm                |
| `price`      | DECIMAL      | Giá sản phẩm                |
| `stock`      | INT          | Số lượng tồn kho            |
| `description`| TEXT         | Mô tả sản phẩm              |
| `category`   | VARCHAR      | Danh mục sản phẩm           |

#### Bảng `orders`
| Tên cột      | Kiểu dữ liệu | Ghi chú                     |
|--------------|--------------|-----------------------------|
| `id`         | Primary Key  |                             |
| `user_id`    | Foreign Key  | Liên kết với `users.id`     |
| `total_price`| DECIMAL      | Tổng giá trị đơn hàng       |
| `status`     | ENUM         | `'pending'`, `'paid'`, `'shipped'`, `'cancelled'` |
| `created_at` | TIMESTAMP    | Thời gian tạo đơn hàng      |

#### Bảng `order_items`
| Tên cột      | Kiểu dữ liệu | Ghi chú                     |
|--------------|--------------|-----------------------------|
| `id`         | Primary Key  |                             |
| `order_id`   | Foreign Key  | Liên kết với `orders.id`    |
| `product_id` | Foreign Key  | Liên kết với `products.id`  |
| `quantity`   | INT          | Số lượng sản phẩm           |
| `price`      | DECIMAL      | Giá sản phẩm tại thời điểm đặt hàng |

### Cấu hình dự án

#### Tạo database trong MySQL Workbench

```sql
-- Tạo database 
CREATE DATABASE IF NOT EXISTS order_management;
USE order_management;

-- Bảng users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'locked') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    description TEXT,
    category VARCHAR(50)
);

-- Bảng orders
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bảng order_items
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Thêm admin mặc định (password: admin123)
INSERT INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@example.com', '$2a$10$xJwL5v5zL33UqZ1YdI1.0uGjL9QJf6wQ6XkZ5v5zL33UqZ1YdI1.0u', 'admin');
```
* Đây là file database [text](database.sql)

#### File cấu hình chính (`app.js`)

```javascript
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('screenshot'));

db.connect((err) => {
        if (err) {
                console.error('Database connection error:', err);
                return;
        } else {
                console.log('Database connected successfully!');
        }
});

app.use('/api', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});
```

#### Kết nối database (`config/db.js`)

```javascript
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
});

const promisePool = pool.promise();

// ✅ Kiểm tra kết nối
promisePool.query('SELECT 1')
        .then(() => console.log('✅ MySQL connected successfully!'))
        .catch(err => console.error('❌ MySQL connection error:', err));

module.exports = promisePool;
```

#### Biến môi trường (`.env`)

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=253004
DB_NAME=order_management
PORT=3000
JWT_SECRET=your_jwt_secret_key
```


### Cách chạy server

Để chạy server, thực hiện các bước sau:

1. Thêm script vào file `package.json`:
        ```json
        "scripts": {
                 "dev": "nodemon app.js"
        }
        ```

2. Chạy lệnh sau trên terminal:
        ```bash
        npm run dev
        ```

### Cấu hình dự án
### Sử dụng thư viện `express-validator`

Thư viện `express-validator` được sử dụng để validate dữ liệu đầu vào. Đảm bảo cài đặt thư viện bằng lệnh:
```bash
npm install express-validator
```

### Cách test API với Postman

#### **Authentication**
- **Đăng ký tài khoản**:
  ```http
  POST http://localhost:3000/api/register
  ```
- **Đăng nhập**:
  ```http
  POST http://localhost:3000/api/login
  ```

#### **Quản lý người dùng**
- **Xem danh sách người dùng**:
  ```http
  GET http://localhost:3000/api/users/user
  ```
- **Khóa tài khoản người dùng**:
  ```http
  PATCH http://localhost:3000/api/user/3/lock
  ```

#### **Quản lý sản phẩm**
- **Xem danh sách sản phẩm**:
  ```http
  GET http://localhost:3000/api/products
  ```
  > Có thể thêm query string, ví dụ: `?category=nam`.

- **Thêm sản phẩm mới (Admin)**:
  ```http
  POST http://localhost:3000/api/products/admin/products
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

- **Cập nhật sản phẩm (Admin)**:
  ```http
  PUT http://localhost:3000/api/products/admin/products/1
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

- **Xóa sản phẩm (Admin)**:
  ```http
  DELETE http://localhost:3000/api/products/admin/products/1
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

#### **Quản lý đơn hàng**
- **Xem danh sách đơn hàng của người dùng**:
  ```http
  GET http://localhost:3000/api/orders
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

- **Tạo đơn hàng mới**:
  ```http
  POST http://localhost:3000/api/orders
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

- **Xem danh sách đơn hàng (Admin)**:
  ```http
  GET http://localhost:3000/api/orders/admin/orders
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

- **Cập nhật trạng thái đơn hàng (Admin)**:
  ```http
  PATCH http://localhost:3000/api/orders
  ```
  > Gửi kèm header:
  ```http
  Authorization: Bearer <token>
  ```

### File Test API với Postman:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/[YOUR_COLLECTION_ID_HERE](https://.postman.co/workspace/My-Workspace~66a25b45-31f5-40f8-85d8-e2f1f596a113/collection/36261573-5ce7fcc7-4786-48b5-a01f-b1ef7c292cd3?action=share&creator=36261573))

- **File json postman**: file json đã export từ postman tại đây: [Order Management API.postman_collection.json](<Order Management API.postman_collection.json>).
- **Import vào Postman**: 
        1. Mở Postman.
        2. Chọn `Import`.
        3. Chọn file vừa tải về và import vào Postman.

---

### 📝 Hướng Phát Triển

- **Thêm hệ thống đánh giá sản phẩm**: Cho phép người dùng đánh giá và nhận xét sản phẩm.
- **Triển khai gửi email xác nhận đơn hàng**: Tự động gửi email xác nhận khi người dùng đặt hàng thành công.
- **Xây dựng dashboard thống kê**: Hiển thị các số liệu như doanh thu, số lượng đơn hàng, sản phẩm bán chạy, v.v.