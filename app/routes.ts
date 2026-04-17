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
  route("api/credit-score", "routes/api/credit-score.ts"),
  route("api/explain-score", "routes/api/explain-score.ts"),
  route("von-kinh-doanh", "routes/von-kinh-doanh.tsx"),
] satisfies RouteConfig;
