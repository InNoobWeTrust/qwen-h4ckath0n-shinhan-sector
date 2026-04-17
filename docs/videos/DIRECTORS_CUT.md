# Director's Cut — Shinhan POS Demo Video (DevPost)

**📹 Live Demo:** https://youtu.be/_QyclkXs1gg  
**📁 Local Video:** `docs/videos/demo.webm` (4.1MB webm)

**Duration:** ~3–4 phút  
**Tone:** Professional, clean, Vietnamese UI with voiceover

---

## Filming Notes

| Scene | Key Visual | Expected Duration |
|-------|-----------|-------------------|
| 1 | Logo + fade in | 5s |
| 2 | Home page full scroll | 15s |
| 3 | 5 tabs with content | 70s |
| 4 | Navigate to credit scoring | 30s |
| 5 | Score page overview + merchant cards | 30s |
| 6 | Metric breakdown scroll | 25s |
| 7 | Click "Giải thích tổng điểm" + AI response | 45s |
| 8 | Pillar explain (optional) | 20s |
| 9 | Wrap-up | 15s |

**Total estimated: ~4:00–4:30**

**Provider already configured** — no need to show the credentials modal. The SparkleButton should trigger immediately on click.

---

## Full Script

### SCENE 1 — COLD OPEN (0:00–0:05)

```
[Full-screen: Logo animation or loading spinner]
VO: "Shinhan Soft POS — Hệ thống quản lý bán lẻ thông minh cho SME Việt Nam"
[Fade in to home page]
```

---

### SCENE 2 — HOME PAGE OVERVIEW (0:05–0:20)

```
[CAMERA: Start at top of / page — header fully visible]

VO: "Đây là màn hình chính của Shinhan SoftPOS — Trung tâm điều hành cho cửa hàng tiện lợi."

[CAMERA: Scroll down slowly, full page scroll, ~5 seconds to reach bottom]

VO: "Tổng quan toàn bộ hệ thống: đơn hàng, kho hàng, nhân viên, biên lai — tất cả trong một giao diện duy nhất."

[CAMERA: Reach bottom of home page]
```

---

### SCENE 3 — NAVIGATE TABS WITH CONTENT (0:20–1:30)

#### Tab 1 — Tổng quan (Dashboard)

```
[CAMERA: Click "Tổng quan" tab]

VO: "Tab Tổng quan hiển thị dashboard tổng thể với các chỉ số kinh doanh chính."

[Pause 3s — let dashboard render]
```

#### Tab 2 — Đơn hàng (OrdersHub)

```
[CAMERA: Click "Đơn hàng" tab]

VO: "Tab Đơn hàng quản lý toàn bộ đơn hàng — tạo mới, theo dõi trạng thái, xử lý thanh toán."

[Pause 3s — let OrdersHub render]
```

#### Tab 3 — Kho hàng (InventoryOverview)

```
[CAMERA: Click "Kho hàng" tab]

VO: "Tab Kho hàng kiểm soát tồn kho theo thời gian thực, cảnh báo khi sắp hết hàng."

[Pause 3s — let InventoryOverview render]
```

#### Tab 4 — Nhân viên (ShiftOverview)

```
[CAMERA: Click "Nhân viên" tab]

VO: "Tab Nhân viên quản lý ca làm việc và phân công nhân sự."

[Pause 3s — let ShiftOverview render]
```

#### Tab 5 — Biên lai (ReceiptCenter)

```
[CAMERA: Click "Biên lai" tab]

VO: "Tab Biên lai tập trung tất cả biên nhận và đối soát giao dịch."

[Pause 3s — let ReceiptCenter render]
```

**Skip:** Bán hàng (placeholder), Phân tích (placeholder) — no action needed.

---

### SCENE 4 — ENTER CREDIT SCORING MINI-APP (1:30–2:00)

```
[CAMERA: Click "Vốn kinh doanh" link button in header — OR navigate to /von-kinh-doanh]

VO: "Bây giờ chúng ta vào tính năng chính — demo chấm điểm tín dụng cho merchant SME."

[CAMERA: von-kinh-doanh page loads — pause 2s to let it render]
```

---

### SCENE 5 — CREDIT SCORING PAGE OVERVIEW (2:00–2:30)

```
[CAMERA: Start at top — header card with 3 info boxes visible]

VO: "Mỗi merchant được chấm điểm trên thang 300 đến 850, chia thành các band: Rất mạnh, Khá, Trung bình, Yếu."

[CAMERA: Scroll down — merchant cards horizontal scrollbar visible]

VO: "Có 5 hồ sơ merchant mẫu — Cửa hàng tiện lợi, Quán cà phê, Nhà hàng, Shop công nghệ, Cửa hàng thời trang — mỗi loại hình có công thức chấm điểm riêng."

[Pause 2s]
```

---

### SCENE 6 — SCROLL TO METRIC BREAKDOWN (2:30–2:55)

```
[CAMERA: Scroll down — left column with circular score gauge visible]

VO: "Màn hình tổng quan tín dụng cho thấy điểm tổng thể, band xếp hạng, và hạn mức đề xuất cho merchant đang chọn."

[Pause 2s]

[CAMERA: Continue scrolling — right column "Phân rã điểm tín dụng" with 4 pillars visible]

VO: "Phân rã điểm tín dụng theo 4 trụ cột: Doanh thu, Ổn định, Thanh toán, và Đa dạng nguồn dữ liệu. Mỗi trụ cột có trọng số riêng."

[Pause 2s]

[CAMERA: Scroll more — positive factors (green), negative factors (red), input data (dark card) visible]

VO: "Bên phải là các yếu tố tích cực, yếu tố cần theo dõi, và dữ liệu đầu vào được dùng để tính điểm."

[Pause 2s]
```

---

### SCENE 7 — CLICK "GIẢI THÍCH TỔNG ĐIỂM" (2:55–3:40)

```
[CAMERA: Locate "Giải thích tổng điểm" button — click it]

VO: "Bây giờ chúng ta bấm nút Giải thích tổng điểm — AI sẽ phân tích điểm số và đưa ra lời giải thích bằng tiếng Việt."

[CAMERA: Wait for AI response — loading spinner on button]

VO: "Hệ thống gọi trực tiếp đến AI provider mà người dùng đã cấu hình — không qua server trung gian. Người dùng tự trả phí API cho nhà cung cấp AI mình chọn."

[CAMERA: AI response appears in ExplanationPanel — markdown renders]

VO: "Kết quả trả về dạng markdown — có thể copy, có thể đọc trực tiếp. Giải thích bao gồm phân tích từng trụ cột, so sánh với ngưỡng trung bình, và khuyến nghị cải thiện."

[Pause 3s — let viewer read the explanation]
```

---

### SCENE 8 — OPTIONAL: CLICK A PILLAR EXPLAIN (3:40–4:00)

```
[CAMERA: Scroll up slightly to find a pillar card — click "Giải thích trụ cột" on any pillar]

VO: "Ngoài tổng điểm, mỗi trụ cột có nút Giải thích trụ cột riêng — AI sẽ phân tích sâu vào yếu tố đó."

[CAMERA: Wait for response, show result]

[Pause 3s]
```

---

### SCENE 9 — WRAP-UP (4:00–4:15)

```
[CAMERA: Pull back to show full page]

VO: "Shinhan SoftPOS — kết hợp quản lý vận hành POS và chấm điểm tín dụng AI trong một hệ thống."

[CAMERA: Fade out]

[End card: DevPost link / Shinhan logo]
```

---

## Technical Recording Setup

### Browser Configuration

- **Viewport:** 1920×1080 (full HD)
- **Scale:** 100%
- **Device:** Desktop
- **CORS disabled** (required for Kilo API)

### Navigation Flow for Recording

1. Open `http://localhost:8787/` — home page
2. Scroll to bottom of home page
3. Click tab: Tổng quan → Đơn hàng → Kho hàng → Nhân viên → Biên lai
4. Navigate to `/von-kinh-doanh`
5. Scroll down through credit scoring page
6. Click "Giải thích tổng điểm" button
7. Wait for AI response
8. (Optional) Click a pillar's "Giải thích trụ cột" button

### Pre-recording Checklist

- [ ] AI provider already configured (Kilo / Puter / Groq / etc.)
- [ ] CORS disabled in browser
- [ ] Server running at localhost:8787
- [ ] Viewport set to 1920×1080
- [ ] No sensitive browser extensions visible
- [x] Demo video already recorded and uploaded to YouTube — use this script only as reference for re-recording if needed