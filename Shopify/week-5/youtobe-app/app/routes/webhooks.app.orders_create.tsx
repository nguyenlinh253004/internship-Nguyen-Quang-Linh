// app/routes/webhooks.tsx
import { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

// The main webhook handler
export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, webhookId } = await authenticate.webhook(request);

  switch (topic) {
    case "ORDERS_CREATE":
      const orderPayload = await request.json();
      await handleOrderCreate(orderPayload, shop);
      break;
    case "APP_UNINSTALLED":
      const appUninstalledPayload = await request.json();
      await handleAppUninstalled(appUninstalledPayload, shop);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
      break;
  }

  return new Response(null, { status: 200 });
};

// Process the orders/create webhook data
async function handleOrderCreate(payload: any, shop: string) {
  try {
    console.log(`New order received from ${shop}`);
    console.log(`Order ID: ${payload.id}`);
    
    // Here you can add logic to:
    // - Save the order to your database
    // - Send notifications
    // - Update inventory
    // - Trigger other business processes
    
    // Example: Store basic order information
    const orderDetails = {
      id: payload.id,
      orderNumber: payload.order_number,
      customerName: payload.customer?.first_name + " " + payload.customer?.last_name,
      totalPrice: payload.total_price,
      createdAt: payload.created_at,
      shop: shop
    };

    console.log("Order details:", orderDetails);
    
    // Add your business logic here
    // e.g., await database.orders.create(orderDetails);
    
  } catch (error) {
    console.error("Error processing order webhook:", error);
    // Consider implementing retry logic or error reporting
  }
}

// Process the app/uninstalled webhook data
async function handleAppUninstalled(payload: any, shop: string) {
  try {
    console.log(`App uninstalled from shop: ${shop}`);
    
    // Here you can add logic to:
    // - Clean up database records
    // - Remove shop-specific data
    // - Update subscription statuses
    // - Log analytics
    
    // Example: Delete or mark as inactive in your database
    // await database.shops.update({ 
    //   where: { shop },
    //   data: { status: "UNINSTALLED", uninstalledAt: new Date() }
    // });
    
    console.log(`Successfully processed app uninstallation for ${shop}`);
    
  } catch (error) {
    console.error("Error processing app uninstalled webhook:", error);
  }
}
