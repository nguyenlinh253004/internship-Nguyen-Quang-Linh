# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Day 13: useEffect, Basic Lifecycle

### Main Content
- **useEffect Hook**: Learn how to use the `useEffect` hook for managing side effects in functional components.
- **Lifecycle in Function Components**: Understand the lifecycle of a functional component and how `useEffect` fits into it.
- **API Calls (fetch/axios)**: Learn how to make API calls using `fetch` or `axios`.

### Exercise
1. **Call a Public API**: Use a public API like [JSONPlaceholder](https://jsonplaceholder.typicode.com/).
2. **Display User List**: Fetch and display a list of users from the API.

### Example
Here’s an example of fetching and displaying user data:

```jsx
import React, { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
```

### Notes
- Ensure error handling is implemented when making API calls.
- Use dependency arrays in `useEffect` to control when the effect runs.
- Experiment with both `fetch` and `axios` to understand their differences.
- Practice by extending the example to include more user details.
### Những phần đã làm trong dự án

- **Cài đặt Axios**: Đã cài đặt thư viện Axios để hỗ trợ việc gọi API.
- **Lấy API về**: Sử dụng Axios để gọi API từ [JSONPlaceholder](https://jsonplaceholder.typicode.com/) và lấy dữ liệu người dùng.
- **Trả dữ liệu về form User**: Dữ liệu từ API được xử lý và hiển thị dưới dạng danh sách người dùng trong giao diện.

#### Ví dụ sử dụng Axios để gọi API và hiển thị dữ liệu:
```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-green-500 mb-6">Danh sách Người dùng</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="border-2 border-gray-300 p-4 rounded-lg shadow-md bg-white transition-transform hover:scale-105"
          >
            <div className="text-xl font-semibold text-gray-800 mb-2">{user.name}</div>
            <div className="text-gray-600 mb-1">{user.email}</div>
            <div className="text-gray-500">{user.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
```

#### Ghi chú:
- Đảm bảo xử lý lỗi khi gọi API bằng cách sử dụng `.catch`.
- Sử dụng `useEffect` với mảng phụ thuộc để kiểm soát thời điểm chạy hiệu ứng.
- Có thể mở rộng ví dụ để hiển thị thêm thông tin chi tiết của người dùng.
### Bài tập

