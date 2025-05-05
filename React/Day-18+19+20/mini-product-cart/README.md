🛒 Mini Product + Cart App
## 📝 Project Description

This is a mini React project that directly connects to a pre-deployed Node.js backend API. The application supports basic functionalities such as displaying products, adding items to the cart, managing orders, and performing CRUD operations for products as an admin.

---

## 🚀 Technologies Used

- **React.js + Vite**: Framework and build tool.
- **Chakra UI**: UI library.
- **React Router DOM**: Routing management.
- **React Hook Form + Yup**: Form handling and validation.
- **Axios**: HTTP client for API calls.
- **React Toastify**: Notification display.
- **useContext + useReducer**: Cart state management.
- **LocalStorage**: Cart data storage.
- **Custom Hook**: Reusable logic.

---

## ✅ Key Features

### 🔐 Login
- Uses API `/api/auth/login`.
- Stores token upon successful login.
- Protects admin routes using the token.

### 🛍️ Product Page
- Displays product list from API.
- Searches products by name.
- Implements pagination.
- Includes "Add to Cart" button.

### 🛒 Cart Page
- Saves cart data to LocalStorage.
- Displays total price.
- Increases/decreases product quantity (+/-).
- Automatically removes items when quantity = 0.
- Shows toast notifications for add/remove actions.
- Includes a confirmation modal for item removal.

### ⚙️ Admin - Product CRUD
- Adds new products (with validation).
- Edits product information.
- Deletes products (with confirmation modal).

### 📦 Admin - Order Management
- Views all customer orders.
- Confirms orders.

---

## 📂 Folder Structure

```plaintext
src/
├── api/
│   ├── axiosInstance.js
│   └── products.js
├── assets/
├── components/
│   ├── ModalConfirm.jsx
│   └── ProductCard.jsx
├── context/
│   └── CartContext.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useProducts.js
├── pages/
│   ├── AdminProductPage.jsx
│   ├── CartPage.jsx
│   ├── LoginPage.jsx
│   └── ProductListPage.jsx
├── App.css
├── App.jsx
├── index.css
├── main.jsx
└── ...
```

---

## ⚙️ Setup & Run

```bash
# 1. Clone the project
git clone ...

# 2. Install packages
npm install

# 3. Run the application
npm run dev
```

⚠️ Ensure your backend API is running at `http://localhost:3000`.

---

## 📝 Notes

- Token is stored in localStorage after login.
- Admin routes are accessible only to admin users.
- Cart is synchronized between Context and LocalStorage.