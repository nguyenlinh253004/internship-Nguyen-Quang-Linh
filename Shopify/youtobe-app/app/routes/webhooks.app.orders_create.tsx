import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import type { ActionFunctionArgs } from "@remix-run/node";
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // 1. Xác thực webhook (HMAC signature + shop domain)
    const { topic, shop, payload } = await authenticate.webhook(request);

    // 2. Kiểm tra topic (dùng UPPER_SNAKE_CASE nếu là GraphQL)
    if (!topic || topic !== "ORDERS_CREATE") {
      return json({ message: "Invalid webhook topic" }, { status: 400 });
    }

    // 3. Parse payload từ JSON string -> object
    const order = JSON.parse(payload);
    console.log("Received order webhook:", order);

    // 4. Xử lý đơn hàng
    await processNewOrder(order, shop);

    // 5. Trả về 200 OK để Shopify biết webhook thành công
    return json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    // Trả về 500 nếu lỗi server, hoặc 401 nếu xác thực thất bại
    const status = error.message.includes("authenticate") ? 401 : 500;
    return json({ error: error.message }, { status });
  }
};