// app/hooks/useAppBridge.js
import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Provider, useAppBridge as useOriginalAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";

// Hook tùy chỉnh để sử dụng AppBridge
export function useAppBridge() {
  const app = useOriginalAppBridge();
  return app;
}

// Hook để sử dụng authenticatedFetch với AppBridge
export function useAuthenticatedFetch() {
  const app = useAppBridge();
  
  // Trả về hàm fetch đã được xác thực
  return authenticatedFetch(app);
}

// Hook để tạo Client GraphQL đã xác thực
export function useAuthenticatedGraphQLClient() {
  const app = useAppBridge();
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!app) return;

    // Hàm tạo headers xác thực
    const fetchFunction = authenticatedFetch(app);
    
    // Tạo một client GraphQL tùy chỉnh
    const graphQLClient = {
      async query(query, variables = {}) {
        const response = await fetchFunction(
          "/api/graphql", // Endpoint proxy cho Shopify GraphQL Admin API
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query,
              variables,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`GraphQL error: ${response.statusText}`);
        }

        return response.json();
      },
    };

    setClient(graphQLClient);
  }, [app]);

  return client;
}

// Component Provider để thiết lập AppBridge
export function AppBridgeProvider({ children }) {
  const navigate = useNavigate();
  
  // Lấy API key và host từ environment variables hoặc window
  const apiKey = process.env.SHOPIFY_API_KEY || "your-api-key";
  const host = new URLSearchParams(window.location.search).get("host") || "";

  const history = {
    replace: (path) => {
      navigate(path);
    },
  };

  const config = {
    apiKey,
    host,
    forceRedirect: true,
  };

  // Kiểm tra nếu không có host (đang ở ngoài Shopify Admin)
  if (!host) {
    return (
      <div>
        <h1>App không chạy trong Shopify Admin</h1>
        <p>App này chỉ có thể chạy trong Shopify Admin.</p>
      </div>
    );
  }

  return (
    <Provider config={config} router={{ history }}>
      {children}
    </Provider>
  );
}