-- Shinhan Soft POS - Seed Data
-- Realistic Vietnamese convenience store: "Cửa hàng tiện lợi Tâm Đức", District 7, HCMC
-- All timestamps use Unix epoch (seconds)

-- ============================================================
-- MERCHANT
-- ============================================================
INSERT INTO merchants (id, name, address, phone, created_at, updated_at) VALUES
  ('mer_tamduc_q7', 'Cửa hàng tiện lợi Tâm Đức', '142 Nguyễn Thị Thập, Phường Tân Quy, Quận 7, TP.HCM', '0289 123 4567', 1712880000, 1712880000);

-- ============================================================
-- STAFF
-- ============================================================
-- PIN hashes are bcrypt of '1234' (prototype only)
INSERT INTO staff (id, merchant_id, name, role, phone, pin, is_active, created_at) VALUES
  ('stf_minh_001', 'mer_tamduc_q7', 'Nguyễn Văn Minh', 'manager', '0901 234 567', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1, 1712880000),
  ('stf_lan_002',  'mer_tamduc_q7', 'Nguyễn Thị Lan',  'cashier', '0912 345 678', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1, 1712880000),
  ('stf_dat_003',  'mer_tamduc_q7', 'Trần Quốc Đạt',   'cashier', '0923 456 789', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 1, 1712880000);

-- ============================================================
-- SHIFTS (1 active shift, opened at 06:00 today = 1744506000)
-- ============================================================
INSERT INTO shifts (id, merchant_id, staff_id, start_time, end_time, status, created_at) VALUES
  ('shf_am_001', 'mer_tamduc_q7', 'stf_minh_001', 1744506000, NULL,       'active', 1744506000),
  ('shf_am_002', 'mer_tamduc_q7', 'stf_lan_002',  1744506000, NULL,       'active', 1744506000),
  ('shf_prev_001', 'mer_tamduc_q7', 'stf_dat_003', 1744419600, 1744462800, 'closed', 1744419600);

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (id, merchant_id, name, created_at) VALUES
  ('cat_nuoc_001',  'mer_tamduc_q7', 'Nước giải khát',    1712880000),
  ('cat_thuc_002',  'mer_tamduc_q7', 'Thực phẩm',         1712880000),
  ('cat_hmp_003',   'mer_tamduc_q7', 'Hóa mỹ phẩm',       1712880000),
  ('cat_tldt_004',  'mer_tamduc_q7', 'Thuốc lá điện tử',  1712880000),
  ('cat_anvat_005', 'mer_tamduc_q7', 'Ăn vặt',            1712880000);

-- ============================================================
-- PRODUCTS (~22 items)
-- ============================================================
INSERT INTO products (id, merchant_id, category_id, sku, name, price, cost, stock, low_stock_threshold, unit, is_active, created_at, updated_at) VALUES
  -- Nước giải khát
  ('prd_warrior_001', 'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-NU002', 'Nước tăng lực Warrior 330ml',   14000,  9800,  11, 20, 'lon',  1, 1712880000, 1712880000),
  ('prd_lavie_002',   'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-NU005', 'Nước suối Lavie 500ml',          9000,  4200,  44, 24, 'chai', 1, 1712880000, 1712880000),
  ('prd_fami_003',    'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-SU003', 'Sữa đậu nành Fami canxi 200ml', 12000,  7600,  26, 18, 'hộp',  1, 1712880000, 1712880000),
  ('prd_c2_004',      'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-TR006', 'Trà xanh C2 455ml',              9500,  5400,   0, 18, 'chai', 1, 1712880000, 1712880000),
  ('prd_birdy_005',   'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-CF001', 'Cà phê lon Birdy 180ml',        18000, 12000,  30, 12, 'lon',  1, 1712880000, 1712880000),
  ('prd_sting_006',   'mer_tamduc_q7', 'cat_nuoc_001', 'CV24-NU006', 'Nước tăng lực Sting dâu 330ml', 15000, 10000,  22, 20, 'lon',  1, 1712880000, 1712880000),

  -- Thực phẩm
  ('prd_mily_007',    'mer_tamduc_q7', 'cat_thuc_002', 'CV24-MI001', 'Mì ly cay Shin đỏ Hàn Quốc',    18000, 11000,   8, 18, 'ly',   1, 1712880000, 1712880000),
  ('prd_haohao_008',  'mer_tamduc_q7', 'cat_thuc_002', 'MI001',      'Mì ly cay Hảo Hảo',              7000,  4500,   5, 20, 'ly',   1, 1712880000, 1712880000),
  ('prd_trung_009',   'mer_tamduc_q7', 'cat_thuc_002', 'CV24-TR007', 'Trứng gà luộc đóng gói',         5000,  2800,   3, 12, 'cái',  1, 1712880000, 1712880000),
  ('prd_banhmi_010',  'mer_tamduc_q7', 'cat_thuc_002', 'CV24-BM001', 'Bánh mì tươi nhân thịt',         9000,  5500,  15, 10, 'cái',  1, 1712880000, 1712880000),
  ('prd_xucxich_011', 'mer_tamduc_q7', 'cat_thuc_002', 'CV24-XX001', 'Xúc xích tiệt trùng CP 48g',    12000,  7500,  40, 20, 'cái',  1, 1712880000, 1712880000),
  ('prd_yakult_012',  'mer_tamduc_q7', 'cat_thuc_002', 'CV24-YK001', 'Sữa chua uống Yakult 65ml',      7000,  4200,  60, 24, 'chai', 1, 1712880000, 1712880000),

  -- Ăn vặt
  ('prd_btrang_013',  'mer_tamduc_q7', 'cat_anvat_005', 'CV24-BA004', 'Bánh tráng cuộn phô mai',        22000, 12800,  19, 16, 'gói',  1, 1712880000, 1712880000),
  ('prd_oishi_014',   'mer_tamduc_q7', 'cat_anvat_005', 'CV24-OI001', 'Snack Oishi tôm chua cay 40g',  15000,  9000,  35, 15, 'gói',  1, 1712880000, 1712880000),
  ('prd_lays_015',    'mer_tamduc_q7', 'cat_anvat_005', 'CV24-LY001', 'Khoai tây Lay''s vị phô mai 52g',25000, 16000,  28, 12, 'gói',  1, 1712880000, 1712880000),
  ('prd_keo_016',     'mer_tamduc_q7', 'cat_anvat_005', 'CV24-KE001', 'Kẹo dẻo Albanese 28g',          20000, 13000,  7,  10, 'gói',  1, 1712880000, 1712880000),

  -- Hóa mỹ phẩm
  ('prd_bomio_017',   'mer_tamduc_q7', 'cat_hmp_003', 'CV24-BM002', 'Bông tẩy trang Miniso 80 miếng', 45000, 28000,  18, 8,  'hộp',  1, 1712880000, 1712880000),
  ('prd_senka_018',   'mer_tamduc_q7', 'cat_hmp_003', 'CV24-SK001', 'Sữa rửa mặt Senka 50ml',         55000, 35000,  12, 6,  'tuýp', 1, 1712880000, 1712880000),
  ('prd_kem_019',     'mer_tamduc_q7', 'cat_hmp_003', 'CV24-KR001', 'Kem chống nắng Anessa SPF 50',  120000, 80000,   6, 5,  'tuýp', 1, 1712880000, 1712880000),
  ('prd_giat_020',    'mer_tamduc_q7', 'cat_hmp_003', 'CV24-GC001', 'Nước giặt Omo túi 400ml',        25000, 16000,  20, 10, 'túi',  1, 1712880000, 1712880000),

  -- Thuốc lá điện tử
  ('prd_pod_021',     'mer_tamduc_q7', 'cat_tldt_004', 'CV24-TL001', 'Pod điện tử Relx Infinity bạc hà',320000, 220000,  4, 5, 'cái', 1, 1712880000, 1712880000),
  ('prd_fluid_022',   'mer_tamduc_q7', 'cat_tldt_004', 'CV24-TL002', 'Tinh dầu pod Relx vị xoài',     150000, 100000, 10, 6, 'hộp',  1, 1712880000, 1712880000);

-- ============================================================
-- ORDERS (13 orders across channels with varied statuses)
-- All created_at = Unix epoch seconds (April 13, 2026 HCMC)
-- ============================================================
INSERT INTO orders (id, merchant_id, shift_id, staff_id, channel, status, subtotal, discount, total, customer_name, customer_phone, notes, settled, settled_at, created_at) VALUES
  -- POS orders
  ('ord_001', 'mer_tamduc_q7', 'shf_am_001', 'stf_lan_002',  'POS',    'completed', 43000,  0,  43000, NULL,             NULL,         NULL, 1, 1744508520, 1744508280),
  ('ord_002', 'mer_tamduc_q7', 'shf_am_001', 'stf_lan_002',  'POS',    'pending',  124000,  0, 124000, NULL,             NULL,         'Khách chờ bổ sung', 0, NULL, 1744509720),
  ('ord_003', 'mer_tamduc_q7', 'shf_am_001', 'stf_minh_001', 'POS',    'completed', 60000,  0,  60000, 'Trần Thị Mai',   NULL,         NULL, 1, 1744517700, 1744515420),
  ('ord_004', 'mer_tamduc_q7', 'shf_am_001', 'stf_lan_002',  'POS',    'completed', 46000,  0,  46000, 'Phạm Gia Bảo',  NULL,         NULL, 1, 1744524960, 1744524000),

  -- Shopee orders
  ('ord_005', 'mer_tamduc_q7', NULL,          NULL,           'Shopee', 'completed', 71000, 2000, 69000, 'Nguyễn Văn Huy', '0908111222', 'Giao nhanh Bình Thạnh', 0, NULL, 1744511160),
  ('ord_006', 'mer_tamduc_q7', NULL,          NULL,           'Shopee', 'completed', 232000, 0, 232000, 'Lê Minh Khoa',   '0919222333', 'Express đã bàn giao tài xế', 0, NULL, 1744514700),
  ('ord_007', 'mer_tamduc_q7', NULL,          NULL,           'Shopee', 'refunded',  66000,  0,  66000, 'Khách Thủ Đức',  NULL,         'Hoàn trả đơn lỗi', 0, NULL, 1744517100),
  ('ord_008', 'mer_tamduc_q7', NULL,          NULL,           'Shopee', 'completed', 72000,  0,  72000, 'Khách online Thủ Đức', '0931333444', NULL, 0, NULL, 1744523280),

  -- TikTok orders
  ('ord_009', 'mer_tamduc_q7', NULL,          NULL,           'TikTok', 'pending',   82000,  0,  82000, 'Khách online quận 10', NULL, 'Đang đóng gói', 0, NULL, 1744512240),
  ('ord_010', 'mer_tamduc_q7', NULL,          NULL,           'TikTok', 'completed', 186000, 0, 186000, 'Khách giao nhanh',    NULL, 'Mì ly + xúc xích + Warrior', 0, NULL, 1744519320),
  ('ord_011', 'mer_tamduc_q7', NULL,          NULL,           'TikTok', 'completed', 148000, 0, 148000, 'Khách giao nhanh quận 10', NULL, NULL, 0, NULL, 1744521720),

  -- MoMo orders
  ('ord_012', 'mer_tamduc_q7', 'shf_am_001', 'stf_dat_003',  'MoMo',   'completed',  87000,  0,  87000, 'Khách vãng lai', NULL,         'Đồ uống + bánh ngọt', 1, 1744514580, 1744514040),
  ('ord_013', 'mer_tamduc_q7', 'shf_am_001', 'stf_dat_003',  'MoMo',   'cancelled',  54000,  0,  54000, 'Khách mang đi',  NULL,         'Giao dịch thất bại', 0, NULL, 1744519740);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price, total_price, created_at) VALUES
  -- ord_001: Mì Hảo Hảo x2 + Trà atiso (mapped to C2) x1
  ('oi_001_1', 'ord_001', 'prd_haohao_008', 2,  7000, 14000, 1744508280),
  ('oi_001_2', 'ord_001', 'prd_c2_004',     1,  9500,  9500, 1744508280),
  ('oi_001_3', 'ord_001', 'prd_birdy_005',  1, 18000, 18000, 1744508280),

  -- ord_002: partial POS order pending
  ('oi_002_1', 'ord_002', 'prd_pod_021',    1, 320000, 320000, 1744509720),

  -- ord_003: Trứng x4 + Lavie x2 + Bánh tráng x1
  ('oi_003_1', 'ord_003', 'prd_trung_009',  4,  5000, 20000, 1744515420),
  ('oi_003_2', 'ord_003', 'prd_lavie_002',  2,  9000, 18000, 1744515420),
  ('oi_003_3', 'ord_003', 'prd_btrang_013', 1, 22000, 22000, 1744515420),

  -- ord_004: Warrior x2 + Shin đỏ x1
  ('oi_004_1', 'ord_004', 'prd_warrior_001', 2, 14000, 28000, 1744524000),
  ('oi_004_2', 'ord_004', 'prd_mily_007',    1, 18000, 18000, 1744524000),

  -- ord_005: Shopee - Bánh tráng x2 + Lavie x3
  ('oi_005_1', 'ord_005', 'prd_btrang_013', 2, 22000, 44000, 1744511160),
  ('oi_005_2', 'ord_005', 'prd_lavie_002',  3,  9000, 27000, 1744511160),

  -- ord_006: Shopee - mixed
  ('oi_006_1', 'ord_006', 'prd_mily_007',   3, 18000, 54000, 1744514700),
  ('oi_006_2', 'ord_006', 'prd_warrior_001',2, 14000, 28000, 1744514700),
  ('oi_006_3', 'ord_006', 'prd_lavie_002',  4,  9000, 36000, 1744514700),
  ('oi_006_4', 'ord_006', 'prd_btrang_013', 5, 22000,110000, 1744514700),

  -- ord_007: Shopee refunded - C2 x4 + Hảo Hảo x2
  ('oi_007_1', 'ord_007', 'prd_c2_004',     4,  9500, 38000, 1744517100),
  ('oi_007_2', 'ord_007', 'prd_haohao_008', 2,  7000, 14000, 1744517100),

  -- ord_008: Shopee - Fami x3 + Trứng x6
  ('oi_008_1', 'ord_008', 'prd_fami_003',   3, 12000, 36000, 1744523280),
  ('oi_008_2', 'ord_008', 'prd_trung_009',  6,  5000, 30000, 1744523280),
  ('oi_008_3', 'ord_008', 'prd_xucxich_011',1, 12000, 12000, 1744523280),

  -- ord_009: TikTok - Shin đỏ x3 + Warrior x2
  ('oi_009_1', 'ord_009', 'prd_mily_007',    3, 18000, 54000, 1744512240),
  ('oi_009_2', 'ord_009', 'prd_warrior_001', 2, 14000, 28000, 1744512240),

  -- ord_010: TikTok - Mì ly + Xúc xích + Warrior
  ('oi_010_1', 'ord_010', 'prd_haohao_008',  3,  7000, 21000, 1744519320),
  ('oi_010_2', 'ord_010', 'prd_xucxich_011', 5, 12000, 60000, 1744519320),
  ('oi_010_3', 'ord_010', 'prd_warrior_001', 5, 14000, 70000, 1744519320),
  ('oi_010_4', 'ord_010', 'prd_btrang_013',  1, 22000, 22000, 1744519320),

  -- ord_011: TikTok
  ('oi_011_1', 'ord_011', 'prd_haohao_008',  6,  7000, 42000, 1744521720),
  ('oi_011_2', 'ord_011', 'prd_warrior_001', 3, 14000, 42000, 1744521720),
  ('oi_011_3', 'ord_011', 'prd_btrang_013',  1, 22000, 22000, 1744521720),
  ('oi_011_4', 'ord_011', 'prd_oishi_014',   2, 15000, 30000, 1744521720),

  -- ord_012: MoMo - Fami x2 + Bánh mì x3 + Birdy x1
  ('oi_012_1', 'ord_012', 'prd_fami_003',   2, 12000, 24000, 1744514040),
  ('oi_012_2', 'ord_012', 'prd_banhmi_010', 3,  9000, 27000, 1744514040),
  ('oi_012_3', 'ord_012', 'prd_birdy_005',  2, 18000, 36000, 1744514040),

  -- ord_013: MoMo cancelled - Birdy x2 + Bánh mì x2
  ('oi_013_1', 'ord_013', 'prd_birdy_005',  2, 18000, 36000, 1744519740),
  ('oi_013_2', 'ord_013', 'prd_banhmi_010', 2,  9000, 18000, 1744519740);

-- ============================================================
-- RECEIPTS (for completed/settled orders)
-- ============================================================
INSERT INTO receipts (id, order_id, merchant_id, r2_key, r2_bucket, status, printed_at, created_at) VALUES
  ('rcp_001', 'ord_001', 'mer_tamduc_q7', 'receipts/mer_tamduc_q7/2026/04/13/ord_001.pdf', 'shinhan-softpos-receipts-dev', 'printed', 1744508340, 1744508300),
  ('rcp_003', 'ord_003', 'mer_tamduc_q7', 'receipts/mer_tamduc_q7/2026/04/13/ord_003.pdf', 'shinhan-softpos-receipts-dev', 'printed', 1744515480, 1744515440),
  ('rcp_004', 'ord_004', 'mer_tamduc_q7', 'receipts/mer_tamduc_q7/2026/04/13/ord_004.pdf', 'shinhan-softpos-receipts-dev', 'printed', 1744524060, 1744524020),
  ('rcp_005', 'ord_005', 'mer_tamduc_q7', 'receipts/mer_tamduc_q7/2026/04/13/ord_005.pdf', 'shinhan-softpos-receipts-dev', 'pending', NULL,       1744511200),
  ('rcp_012', 'ord_012', 'mer_tamduc_q7', 'receipts/mer_tamduc_q7/2026/04/13/ord_012.pdf', 'shinhan-softpos-receipts-dev', 'printed', 1744514100, 1744514060);
