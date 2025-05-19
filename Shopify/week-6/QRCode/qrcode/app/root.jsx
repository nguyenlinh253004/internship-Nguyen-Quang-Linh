import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import * as Polaris from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { useMemo } from "react";
// import { AppBridgeProvider } from "./hooks/useAppBridge";

export default function App() {
  // const config = useMemo(
  //   () => ({
  //     apiKey: process.env.SHOPIFY_API_KEY, // Thay bằng API Key từ Shopify Partner Dashboard
  //     host: new URLSearchParams(window.location.search).get('host'),
  //   }),
  //   []
  // );
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={enTranslations}>   
              <Outlet />
        </AppProvider>
        <ScrollRestoration />
        <Scripts />

      </body>
    </html>
  );
}
