# Tổng quan Remix + Setup Shopify Remix App

## 1. Giới thiệu Remix framework

Remix là một full-stack JavaScript framework được xây dựng trên nền React, tập trung vào việc tối ưu hoá trải nghiệm người dùng và hiệu suất trang web.

### Các tính năng chính của Remix:
- Server-side rendering và hydration
- Nested routing với file-system based routing
- Built-in data loading và mutation (actions)
- Error boundary tích hợp sẵn
- Progressive enhancement

## 2. Vì sao Shopify chọn Remix làm default App framework?

Shopify đã chọn Remix làm framework mặc định cho việc phát triển ứng dụng vì những lý do sau:
- **Hiệu suất vượt trội:** Remix cung cấp hiệu suất tốt nhờ vào server-side rendering và code splitting
- **UX được cải thiện:** Load data nhanh và song song, giảm thiểu waterfall effect
- **Tích hợp tốt với Shopify Polaris:** Design system của Shopify
- **Mô hình lập trình đơn giản:** Dễ học và phát triển
- **Tương thích với OAuth flow:** Cần thiết cho Shopify App
### 3. Setup dự án Remix với Shopify CLI

Để bắt đầu một dự án Remix với Shopify CLI, hãy làm theo các bước sau:

#### **Yêu cầu trước khi bắt đầu**
- Node.js (>= 16)
- npm hoặc yarn
- Tài khoản Shopify Partner
- Đã cài đặt Shopify CLI

#### **Các bước cài đặt**

1. **Cài đặt Shopify CLI**

    Nếu chưa cài đặt, chạy:
    ```bash
    npm install -g @shopify/cli @shopify/theme
    ```

2. **Tạo ứng dụng Remix mới với Shopify**

    Sử dụng npm:
    ```bash
    npm init @shopify/app@latest -- --template=remix
    ```
    Hoặc với yarn:
    ```bash
    yarn create @shopify/app --template=remix
    ```

3. **Làm theo hướng dẫn của CLI**

    - Nhập tên ứng dụng (tên thư mục sẽ được tạo)
    - Xác nhận thông tin và chờ CLI tạo ứng dụng

4. **Di chuyển vào thư mục dự án**
    ```bash
    cd <tên-ứng-dụng>
    ```

5. **Khởi chạy môi trường phát triển**

    Với npm:
    ```bash
    npm run dev
    ```
    Hoặc với yarn:
    ```bash
    yarn dev
    ```

    Lệnh này sẽ:
    - Khởi chạy một tunnel bảo mật
    - Đăng ký ứng dụng với Shopify Partner
    - Cài đặt ứng dụng trên cửa hàng phát triển

6. **Đăng nhập và ủy quyền**

    - Trình duyệt sẽ tự động mở để đăng nhập vào Shopify Partner
    - Chọn cửa hàng phát triển để cài đặt
    - Cấp quyền cho ứng dụng

#### **Cấu trúc dự án sau khi setup**

```
my-shopify-app/
├── app/                  # Mã nguồn Remix
│   ├── routes/           # Định nghĩa các route
│   └── shopify.server.js # Cấu hình Shopify API
├── public/               # Tài nguyên tĩnh
├── shopify.app.toml      # Cấu hình ứng dụng Shopify
└── package.json
```
## 4. Cấu trúc chuẩn 1 Remix Shopify App

Một ứng dụng Remix Shopify App thường có cấu trúc như sau:

```
my-shopify-app/
├── app/
│   ├── routes/          # Chứa các route của app
│   ├── models/          # Logic business và data access
│   ├── components/      # UI components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Helper functions
│   ├── styles/          # CSS styles
│   ├── entry.client.tsx # Client entry point
│   └── entry.server.tsx # Server entry point
├── public/              # Static assets
├── shopify.app.toml     # Cấu hình Shopify App
└── package.json
```

### Các file quan trọng:
- **app/routes/_index.tsx:** Homepage của app
- **app/routes/app.$.tsx:** Xử lý các app routes
- **app/entry.server.tsx:** Server rendering setup
- **app/entry.client.tsx:** Client hydration

## 5. Data Loader, Action, Route in Remix

### Data Loader
Loader là hàm server-side được sử dụng để tải dữ liệu trước khi render một route. Dùng để fetch data từ API, database hoặc các nguồn khác.

```javascript
// app/routes/products.$id.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { id } = params;

    // Lấy thông tin sản phẩm từ Shopify Admin API
    const product = await admin.rest.resources.Product.find(id);

    return json({ product });
}

export default function Product() {
    const { product } = useLoaderData<typeof loader>();
    // Render UI với dữ liệu product
}
```

### Routes trong Remix
Remix sử dụng file-system based routing, tương tự như Next.js nhưng có những khác biệt quan trọng:
- **File-based routing:** Mỗi file trong `app/routes/` đại diện cho một route
- **Nested routes:** Sử dụng dấu "/" hoặc cấu trúc thư mục lồng nhau
- **Dynamic routes:** Sử dụng `$` để định nghĩa params (e.g., `products.$id.tsx`)
- **Layout routes:** File `_layout.tsx` chứa layout cho các routes con
- **Resource routes:** Return trực tiếp Response objects thay vì JSX

```
app/routes/
├── _index.tsx         # Route chính "/"
├── app.tsx            # Parent layout route "/app"
├── app/
│   ├── _index.tsx     # "/app" route
│   └── products.tsx   # "/app/products" route
└── app.$param.tsx     # Dynamic route "/app/:param"
```

## 6. Ví dụ thực tế: Product Inventory App Block

Dưới đây là một ví dụ về một App Block cho Product Page hiển thị thông tin tồn kho từ API:

```javascript
// app/routes/app.products.$id.inventory.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import { Card, Text, List, Link } from "@shopify/polaris";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { admin } = await authenticate.admin(request);
    const { id } = params; // Product ID

    // Lấy dữ liệu tồn kho từ REST API
    const inventory = await getProductInventory(admin, id);

    return json({ inventory });
}

export default function ProductInventory() {
    const { inventory } = useLoaderData<typeof loader>();

    return (
        <Card>
            <Card.Section>
                <Text variant="headingSm">Tồn kho theo cửa hàng</Text>
            </Card.Section>
            <Card.Section>
                {/* Hiển thị dữ liệu tồn kho */}
            </Card.Section>
        </Card>
    );
}
```

## 7. Bài tập và hướng phát triển

1. Tạo một Remix Shopify App sử dụng CLI
2. Thêm ít nhất 2 routes: products list và product detail
3. Sử dụng loader để fetch dữ liệu sản phẩm từ Shopify Admin API
4. Thêm một form để tạo/cập nhật sản phẩm sử dụng action
5. Tạo một App Block có thể nhúng vào Product Page Shopify
6. Đăng ký webhook để theo dõi thay đổi sản phẩm

## Tài liệu tham khảo
- Tài liệu chính thức của Remix: [remix.run/docs](https://remix.run/docs)
- Shopify App Development Guide: [shopify.dev/apps/getting-started/create](https://shopify.dev/apps/getting-started/create)
- Shopify Remix App Documentation: [shopify.dev/docs/api/shopify-app-remix](https://shopify.dev/docs/api/shopify-app-remix)
- Shopify Admin API Reference: [shopify.dev/api/admin-rest](https://shopify.dev/api/admin-rest)

Nội dung chính

Giới thiệu Remix framework - Framework JavaScript full-stack với các tính năng server-side rendering, nested routing và data loading tích hợp
Lý do Shopify chọn Remix làm framework mặc định - Hiệu suất vượt trội, UX được cải thiện, tích hợp tốt với Shopify Polaris và dễ phát triển
Cách setup dự án Remix với Shopify CLI - Hướng dẫn từng bước cài đặt CLI và tạo dự án mới
Cấu trúc chuẩn cho một Remix Shopify App - Chi tiết về cấu trúc thư mục và các file quan trọng trong ứng dụng
Data Loader, Action và Routes trong Remix - Giải thích chi tiết về:

Loader để lấy dữ liệu từ server
Action để xử lý form và mutations
Cách hoạt động của hệ thống routing trong Remix


Ví dụ thực tế: Product Inventory App Block - Code mẫu cho một App Block hiển thị thông tin tồn kho sản phẩm
Bài tập và hướng phát triển tiếp theo - Các nhiệm vụ cụ thể để thực hành kiến thức

Bạn có thể tiếp tục tìm hiểu sâu hơn về:

Tích hợp GraphQL với Admin API của Shopify
App Bridge và Polaris để xây dựng UI chuyên nghiệp
Cách triển khai App Extensions và App Blocks
Webhooks và App subscriptions
