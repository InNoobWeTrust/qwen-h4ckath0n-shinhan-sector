import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Shinhan Soft POS</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`body { font-family: 'Be Vietnam Pro', sans-serif; }`}</style>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-50 text-slate-700 antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Lỗi không xác định";
  let details = "Đã xảy ra lỗi khi tải trang.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Không tìm thấy" : `Lỗi ${error.status}`;
    details = error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">{message}</h1>
        <p className="mt-4 text-slate-600">{details}</p>
      </div>
    </div>
  );
}