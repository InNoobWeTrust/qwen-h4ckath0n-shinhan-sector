-- Shinhan Soft POS - Initial Schema
-- D1 / SQLite compatible

-- Drop in reverse dependency order (child tables first)
DROP TABLE IF EXISTS receipts;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS shifts;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS merchants;

-- merchants table
CREATE TABLE merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- staff table
CREATE TABLE staff (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'cashier', 'manager', 'admin'
  phone TEXT,
  pin TEXT, -- hashed
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

-- shifts table
CREATE TABLE shifts (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER,
  status TEXT DEFAULT 'active', -- 'active', 'closed'
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);

-- categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

-- products table (inventory items)
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  category_id TEXT,
  sku TEXT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- in VND, no decimals
  cost INTEGER, -- cost price for margin calc
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  unit TEXT DEFAULT 'cái', -- cái, kg, lít, etc.
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL,
  shift_id TEXT,
  staff_id TEXT,
  channel TEXT NOT NULL, -- 'POS', 'Shopee', 'TikTok', 'MoMo'
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'cancelled', 'refunded'
  subtotal INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  notes TEXT,
  settled INTEGER DEFAULT 0, -- 0 = unpaid/unsettled, 1 = settled
  settled_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  FOREIGN KEY (shift_id) REFERENCES shifts(id),
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);

-- order_items table
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- receipts table
CREATE TABLE receipts (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  merchant_id TEXT NOT NULL,
  r2_key TEXT NOT NULL, -- R2 object key
  r2_bucket TEXT DEFAULT 'receipts',
  status TEXT DEFAULT 'pending', -- 'pending', 'printed', 'failed'
  printed_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

-- Indexes for common query patterns
CREATE INDEX idx_staff_merchant ON staff(merchant_id);
CREATE INDEX idx_shifts_merchant ON shifts(merchant_id);
CREATE INDEX idx_shifts_status ON shifts(merchant_id, status);
CREATE INDEX idx_categories_merchant ON categories(merchant_id);
CREATE INDEX idx_products_merchant ON products(merchant_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_merchant ON orders(merchant_id);
CREATE INDEX idx_orders_shift ON orders(shift_id);
CREATE INDEX idx_orders_created ON orders(merchant_id, created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_receipts_order ON receipts(order_id);
CREATE INDEX idx_receipts_merchant ON receipts(merchant_id);