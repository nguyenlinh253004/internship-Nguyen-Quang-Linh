# Day 11: Giới thiệu ReactJS, JSX, Component, Props, Quy chuẩn code

## Nội dung chính

### 1. Tổng quan ReactJS
ReactJS là một thư viện JavaScript mạnh mẽ được phát triển bởi Facebook, giúp xây dựng giao diện người dùng (UI) hiệu quả và dễ bảo trì. Một số đặc điểm nổi bật của ReactJS:
- **Component-based**: Sử dụng mô hình dựa trên component, giúp tái sử dụng mã nguồn và dễ dàng quản lý.
- **Virtual DOM**: Tăng hiệu suất bằng cách cập nhật DOM ảo trước khi áp dụng thay đổi vào DOM thực.
- **Unidirectional Data Flow**: Dữ liệu chỉ di chuyển theo một chiều, giúp dễ dàng kiểm soát trạng thái ứng dụng.

### 2. JSX Syntax
JSX là một cú pháp mở rộng của JavaScript, cho phép viết mã HTML trong JavaScript. Một số điểm cần lưu ý khi sử dụng JSX:
- **Cú pháp gần giống HTML**: Tuy nhiên, có một số khác biệt quan trọng:
    - Sử dụng `className` thay vì `class` để tránh xung đột với từ khóa JavaScript.
    - Các thẻ phải được đóng đầy đủ, ví dụ: `<img src="image.jpg" />`.
- **Biểu thức JavaScript trong JSX**: Có thể sử dụng biểu thức JavaScript trong JSX bằng cách đặt trong dấu ngoặc nhọn `{}`.

Ví dụ:
```jsx
const element = <h1>Chào mừng đến với React!</h1>;
```

### 3. Functional Component
Functional Component là các hàm JavaScript trả về JSX. Đây là cách đơn giản và phổ biến để tạo component trong React.

#### Đặc điểm:
- Dễ viết, dễ quản lý.
- Không có state riêng (trước khi React Hooks ra đời).

#### Ví dụ:
```jsx
function Welcome(props) {
    return <h1>Xin chào, {props.name}!</h1>;
}
```

### 4. Props và Children
#### Props:
- Là các tham số được truyền từ component cha xuống component con.
- Props là immutable (không thể thay đổi).

#### Children:
- Là nội dung nằm giữa thẻ mở và thẻ đóng của component.

#### Ví dụ:
```jsx
function Card(props) {
    return (
        <div className="card">
            <h2>{props.title}</h2>
            {props.children}
        </div>
    );
}
```

Sử dụng:
```jsx
<Card title="Tiêu đề">
    <p>Nội dung bên trong thẻ Card.</p>
</Card>
```

### 5. Setup Project React
#### Cách 1: Sử dụng `create-react-app`
1. Khởi tạo dự án:
    ```bash
    npx create-react-app my-app
    cd my-app
    ```
2. Chạy ứng dụng:
    ```bash
    npm start
    ```

#### Cách 2: Sử dụng `Vite` (Khuyên dùng)
1. Khởi tạo dự án:
    ```bash
    npm create vite@latest my-react-app --template react 
    cd my-react-app
    npm i
    ```
2. Cài đặt các plugin cần thiết:
    ```bash
    npm install @vitejs/plugin-react-refresh @types/node --save-dev
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
    npm i react-router-dom   // cấu hình routes
    ```
3. Chạy ứng dụng:
    ```bash
    npm run dev
    ### 6. Cấu trúc thư mục

    Dưới đây là cấu trúc thư mục mẫu cho một dự án React:

    ```
    my-react-app/
    ├── node_modules/       # Thư mục chứa các package đã cài đặt
    ├── public/             # Thư mục chứa các file tĩnh
    │   ├── index.html      # File HTML chính
    │   └── favicon.ico     # Icon của ứng dụng
    ├── src/                # Thư mục chứa mã nguồn chính
    │   ├── assets/         # Chứa các tài nguyên như hình ảnh
    │   ├── component/      # Chứa các component tái sử dụng
    │   │   ├── Cart.jsx    # Component giỏ hàng
    │   │   ├── ProductItem.jsx # Component hiển thị sản phẩm
    │   │   └── ProductList.jsx # Component danh sách sản phẩm
    │   ├── App.jsx         # Component gốc của ứng dụng
    │   ├── index.css       # File CSS chính
    │   └── main.jsx        # Điểm vào của ứng dụng
    ├── .gitignore          # File cấu hình Git
    ├── eslint.config.js    # File cấu hình ESLint
    ├── package.json        # File cấu hình dự án
    ├── postcss.config.js   # File cấu hình PostCSS
    ├── tailwind.config.js  # File cấu hình Tailwind CSS
    ├── vite.config.js      # File cấu hình Vite
    └── README.md           # File tài liệu dự án
    ```

    #### Cấu hình Tailwind CSS

    1. Cài đặt Tailwind CSS:
        ```bash
        npm install -D tailwindcss postcss autoprefixer
        npx tailwindcss init
        ```

    2. Cập nhật file `tailwind.config.js`:
        ```javascript
                /** @type {import('tailwindcss').Config} */
            export default {
            content: [
                "./index.html",
                "./src/**/*.{html,js,jsx,ts,tsx}"],
            theme: {
                extend: {},
            },
            plugins: [],
            }
        ```

    3. Thêm Tailwind vào file CSS chính (ví dụ: `src/index.css`):
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        ```

    4. Đảm bảo các file CSS được import trong ứng dụng React, ví dụ:
        ```javascript
        import './index.css';
        ```

    5. Chạy ứng dụng:
        ```bash
        npm run dev
        ```
### 7. Code Style Convention
Để đảm bảo mã nguồn dễ đọc và bảo trì, cần tuân thủ các quy chuẩn code:
- **Sử dụng ESLint và Prettier**: Để tự động kiểm tra và định dạng mã nguồn.
- **Quy tắc cơ bản**:
    - Tên component viết hoa chữ cái đầu (PascalCase).
    - Sử dụng dấu ngoặc kép đôi (`"`) cho thuộc tính JSX.
    - Tránh lồng quá nhiều component trong một file.

### 7. Bài tập thực hành
#### Mục tiêu:
- Tạo **Product List** và **Cart** đơn giản.

#### Yêu cầu:
1. **Hiển thị danh sách sản phẩm**:
    - Mỗi sản phẩm bao gồm: tên, giá, và hình ảnh.
2. **Thêm sản phẩm vào giỏ hàng**:
    - Khi nhấn nút "Thêm vào giỏ", sản phẩm sẽ được thêm vào giỏ hàng.
3. **Hiển thị giỏ hàng**:
    - Tổng số lượng sản phẩm.
    - Tổng giá trị sản phẩm.

#### Gợi ý:
- Sử dụng state để quản lý danh sách sản phẩm và giỏ hàng.
- Tạo các component riêng biệt như `Product`, `ProductList`, và `Cart`.

