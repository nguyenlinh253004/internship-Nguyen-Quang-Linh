import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { AppProvider } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css'; 
import "./tailwind.css";
import { Suspense } from "react";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/node_modules/@shopify/polaris/build/esm/styles.css" },
];
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <AppProvider i18n={translations}>
      <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet /> ;
}
