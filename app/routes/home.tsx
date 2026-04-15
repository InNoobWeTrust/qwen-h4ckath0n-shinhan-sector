import { useLoaderData } from "react-router";
import AppShell from "../components/layout/AppShell";
import type { Route } from "./+types/home";

export async function loader({ context }: Route.LoaderArgs) {
  const db = context.cloudflare.env.shinhan_pos_db;
  const merchant = await db.prepare(`SELECT * FROM merchants LIMIT 1`).first();
  const products = await db.prepare(`SELECT * FROM products WHERE is_active = 1`).all();
  const orders = await db.prepare(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 50`).all();
  const staff = await db.prepare(`SELECT * FROM staff WHERE is_active = 1`).all();
  const shift = await db.prepare(`SELECT * FROM shifts WHERE status = 'active' LIMIT 1`).first();
  const shiftStaff = shift
    ? await db.prepare(`SELECT s.* FROM staff s JOIN shifts sh ON sh.staff_id = s.id WHERE sh.status = 'active'`).all()
    : { results: [] };

  return {
    merchant,
    products: products.results || [],
    orders: orders.results || [],
    staff: staff.results || [],
    activeShift: shift || null,
    shiftStaff: shiftStaff.results || [],
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <AppShell initialData={loaderData} />;
}