import { useLoaderData } from "react-router";
import AppShell from "../components/layout/AppShell";
import type { Route } from "./+types/home";

export async function loader({ context }: Route.LoaderArgs) {
  const db = context.cloudflare.env.shinhan_pos_db;

  async function safeQuery<T>(
    fn: () => Promise<{ results?: T[] } | T | null>,
  ): Promise<T[]> {
    try {
      const result = await fn();

      if (!result) {
        return [];
      }

      if (typeof result === "object" && "results" in result) {
        return result.results ?? [];
      }

      return [result as T];
    } catch {
      return [];
    }
  }

  async function safeFirst<T>(fn: () => Promise<T | null>): Promise<T | null> {
    try {
      return await fn();
    } catch {
      return null;
    }
  }

  const merchant = await safeFirst(() =>
    db.prepare(`SELECT * FROM merchants LIMIT 1`).first(),
  );
  const products = await safeQuery(() =>
    db.prepare(`SELECT * FROM products WHERE is_active = 1`).all(),
  );
  const orders = await safeQuery(() =>
    db.prepare(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 50`).all(),
  );
  const staff = await safeQuery(() =>
    db.prepare(`SELECT * FROM staff WHERE is_active = 1`).all(),
  );
  const shift = await safeFirst(() =>
    db.prepare(`SELECT * FROM shifts WHERE status = 'active' LIMIT 1`).first(),
  );
  const shiftStaff = shift
    ? await safeQuery(() =>
        db
          .prepare(
            `SELECT s.* FROM staff s JOIN shifts sh ON sh.staff_id = s.id WHERE sh.status = 'active'`,
          )
          .all(),
      )
    : [];

  return {
    merchant,
    products,
    orders,
    staff,
    activeShift: shift,
    shiftStaff,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <AppShell initialData={loaderData} />;
}
