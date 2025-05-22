
import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);

  console.log(`──▶ Received ${topic} webhook from ${shop}`);

  try {
    const order = payload;
    
    // Log thông tin cơ bản
    console.log("🆕 New order:", {
      id: order.id,
      number: order.name,
      total: order.total_price,
      email: order.email,
      items: order.line_items.length,
    });

   
    console.log(`✅ Order ${order.name} saved to database`);
  } catch (error) {
    console.error("❌ Error processing order:", error);
    return new Response("Failed to process order", { status: 500 });
  }

  return new Response(null, { status: 200 });
};