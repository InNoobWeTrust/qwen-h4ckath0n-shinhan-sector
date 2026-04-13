import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/health", "routes/api/health.ts"),
  route("api/merchants", "routes/api/merchants.ts"),
  route("api/products", "routes/api/products.ts"),
  route("api/orders", "routes/api/orders.ts"),
  route("api/staff", "routes/api/staff.ts"),
  route("api/shifts", "routes/api/shifts.ts"),
  route("api/receipts", "routes/api/receipts.ts"),
] satisfies RouteConfig;