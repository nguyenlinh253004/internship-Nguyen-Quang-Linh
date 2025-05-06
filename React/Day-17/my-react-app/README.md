# 🛒 Day 17 - Cart App with useReducer, Custom Hook & API (React + Vite + Tailwind)

## 📌 Nội dung chính
- Sử dụng `useReducer` thay vì `useState` để quản lý giỏ hàng.
- Tách logic xử lý giỏ hàng ra thành custom hook (`useCartActions`).
- Tương tác với REST API Node.js:
    - Lấy danh sách sản phẩm.
    - Thêm sản phẩm.
    - Xóa sản phẩm.
    - Cập nhật sản phẩm.
- Tạo UI thân thiện với Tailwind CSS.
- Phân biệt giữa phần **user** và **admin** để xử lý giỏ hàng và quản lý sản phẩm.

## 🛠️ Công nghệ sử dụng
- **React + Vite**
- **Tailwind CSS**
- **React Hook Form** + **Yup** (validate form)
- **Axios**
- **React Router**
- **useReducer** + **useContext**
- **Node.js** (API backend)

## 📁 Cấu trúc thư mục
```bash
src/
├── api/
│   └── products.js         # Gọi API CRUD
├── components/
│   ├── ProductList.jsx     # Hiển thị sản phẩm cho user
│   ├── ProductForm.jsx     # Form thêm/sửa sản phẩm
│   └── AdminProductList.jsx# Trang admin quản lý sản phẩm
├── context/
│   └── CartContext.jsx     # useReducer + Context cho giỏ hàng
├── hooks/
│   └── useCartActions.js   # Custom hook cho logic giỏ hàng
├── App.jsx                 # Route chính
└── main.jsx
```

## 🚀 Hướng dẫn chạy project
### 1. Cài đặt dependencies
```bash
npm install
```
Đảm bảo bạn đã cài:
- `@hookform/resolvers`
- `react-hook-form`
- `yup`
- `axios`
- `react-router-dom`

Cài đặt các dependencies bổ sung:
```bash
npm install axios react-hook-form yup @hookform/resolvers react-router-dom
```

### 2. Chạy frontend
```bash
npm run dev
```

### 3. Backend (Node.js & Express)
Đảm bảo bạn đã có server Node.js & Express đang chạy tại `http://localhost:3000/products`.

## 🧩 Các chức năng chính
### Người dùng (User)
- Xem danh sách sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Quản lý giỏ hàng bằng `useReducer`.

### Quản trị viên (Admin)
- CRUD sản phẩm:
    - ✅ Tạo
    - ✅ Cập nhật
    - ✅ Xóa
- Sử dụng `ProductForm` để gọi API trực tiếp.
