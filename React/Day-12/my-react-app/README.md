# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Day 12: State, Event, Conditional Rendering, List & Key, Form Handling

### Nội dung chính
1. **useState Hook**  
    - Tìm hiểu cách sử dụng `useState` để quản lý state trong React.
    - Ví dụ: Tạo state để lưu trữ giá trị và cập nhật nó khi cần.

2. **Event Handling trong React**  
    - Học cách xử lý sự kiện trong React như `onClick`, `onChange`, v.v.
    - Ví dụ: Gọi hàm khi người dùng click vào button.

3. **Conditional Rendering**  
    - Hiển thị hoặc ẩn các thành phần dựa trên điều kiện.
    - Ví dụ: Sử dụng toán tử điều kiện (`? :`) hoặc toán tử logic (`&&`).

4. **Render List, sử dụng key**  
    - Hiển thị danh sách các phần tử từ một mảng.
    - Sử dụng thuộc tính `key` để đảm bảo hiệu suất và tránh lỗi.

5. **Form input, handle change**  
    - Quản lý dữ liệu nhập từ người dùng thông qua form.
    - Sử dụng state để lưu trữ và xử lý dữ liệu form.

---

### Bài tập
1. **App Counter**  
    - Tạo một ứng dụng đếm số với các chức năng:
      - Tăng/giảm số khi click vào button.
      - Thêm button để toggle ẩn/hiện Counter.

2. **Todo List**  
    - Tạo ứng dụng quản lý danh sách công việc với các chức năng:
      - Thêm, sửa, xóa todo.
      - Validate không cho phép thêm todo rỗng.

---

### Cài đặt Tailwind CSS
Để sử dụng Tailwind CSS trong dự án React + Vite, làm theo các bước sau:

1. **Cài đặt Tailwind CSS**  
    Chạy lệnh sau để cài đặt Tailwind CSS và các phụ thuộc:
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
    ```

2. **Cấu hình Tailwind**  
    Thêm đường dẫn đến các file trong dự án vào `content` trong file `tailwind.config.js`:
    ```javascript
    module.exports = {
      content: [
         "./index.html",
         "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
         extend: {},
      },
      plugins: [],
    };
    ```

3. **Thêm Tailwind vào CSS**  
    Thêm các directive của Tailwind vào file CSS chính (ví dụ: `src/index.css`):
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

4. **Sử dụng Tailwind trong dự án**  
    - Sử dụng các class của Tailwind để tạo giao diện nhanh chóng.
    - Ví dụ: 
      ```jsx
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
         Click Me
      </button>
      ```

---
### Cấu trúc thư mục

Dưới đây là cấu trúc thư mục của dự án React + Vite:

```
my-react-app/
├── node_modules/          # Thư mục chứa các package đã cài đặt
├── public/                # Thư mục chứa các file tĩnh
├── src/                   # Thư mục chứa mã nguồn chính
│   ├── assets/            # Thư mục chứa các tài nguyên (hình ảnh, font, v.v.)
│   ├── components/        # Thư mục chứa các thành phần React
│   │   ├── Counter.jsx    # Thành phần Counter
│   │   ├── TodoList.jsx   # Thành phần TodoList
│   ├── App.jsx            # Thành phần gốc của ứng dụng
│   ├── index.css          # File CSS chính
│   ├── main.jsx           # Điểm vào chính của ứng dụng
├── .gitignore             # File cấu hình Git
├── eslint.config.js       # File cấu hình ESLint
├── index.html             # File HTML chính
├── package.json           # File cấu hình dự án
├── postcss.config.js      # File cấu hình PostCSS
├── README.md              # File hướng dẫn
├── tailwind.config.js     # File cấu hình Tailwind CSS
├── vite.config.js         # File cấu hình Vite
```

Cấu trúc này giúp tổ chức dự án một cách rõ ràng, dễ quản lý và mở rộng.

### Gợi ý triển khai
- **Counter App**: Sử dụng `useState` để quản lý giá trị đếm và trạng thái ẩn/hiện.
- **Todo List**: Sử dụng mảng để lưu danh sách todo, kết hợp với các sự kiện để thêm, sửa, xóa.

Chúc bạn học tập vui vẻ và thành công!