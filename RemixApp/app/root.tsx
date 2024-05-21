import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css?url";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { LayoutHeader } from "./components/layoutHeader";
import { LayoutMenu } from "./components/layoutMenu";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function loader() {
  const ENV = {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  };
  return json({ ENV });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Links />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        <script
          src="https://upload-widget.cloudinary.com/latest/global/all.js"
          type="text/javascript"
        ></script>
        <div className="h-screen w-full bg-blue-600 font-mono flex flex-col">
          <LayoutHeader />
          <LayoutMenu />
          <div className="flex-grow flex justify-center items-center">
            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
