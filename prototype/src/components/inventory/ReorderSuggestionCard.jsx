import { ArrowRight, CircleDollarSign, PackagePlus, Wallet } from 'lucide-react'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function formatDays(value) {
  if (value <= 0) {
    return 'Hết ngay trong hôm nay'
  }

  return `${value.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} ngày nữa`
}

function getReorderMetrics(item) {
  const averageDailyUnits = item.unitsSold7d / 7
  const suggestedReorderQuantity = Math.max(
    item.reorderPoint * 2 - item.stockOnHand,
    Math.ceil(averageDailyUnits * 10 - item.stockOnHand),
    item.reorderPoint - item.stockOnHand,
    0,
  )
  const estimatedRestockCost = suggestedReorderQuantity * item.costPerUnit
  const estimatedRevenue = suggestedReorderQuantity * item.pricePerUnit
  const needsCapitalSupport =
    item.stockOnHand <= item.reorderPoint && item.unitsSold7d >= 60 && item.estimatedDaysRemaining <= 2 && estimatedRestockCost >= 200000

  return {
    averageDailyUnits,
    suggestedReorderQuantity,
    estimatedRestockCost,
    estimatedRevenue,
    needsCapitalSupport,
  }
}

function ReorderSuggestionCard({ item, onOpenCapitalSolution }) {
  if (!item) {
    return (
      <div className="rounded-[32px] border border-dashed border-sky-200 bg-white/75 p-6 text-sm text-slate-500 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
        Chọn một sản phẩm trong danh sách kho hoặc cảnh báo tồn kho để xem gợi ý nhập hàng theo nhịp bán thực tế.
      </div>
    )
  }

  const metrics = getReorderMetrics(item)

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(14,165,233,0.1)_0%,rgba(16,185,129,0.08)_100%)] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Đề xuất nhập hàng</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{item.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              SKU {item.sku} • {item.category} • Nhà cung cấp {item.supplier}
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-sky-100">
            Còn {item.stockOnHand} đơn vị • dự kiến {formatDays(item.estimatedDaysRemaining)}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 lg:grid-cols-3">
        <div className="rounded-[24px] bg-slate-50 p-5">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
              <PackagePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Số lượng nên nhập</p>
              <p className="text-2xl font-semibold">{metrics.suggestedReorderQuantity} đơn vị</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Bù mức tồn an toàn và giữ đủ hàng cho khoảng 10 ngày bán tiếp theo.</p>
        </div>

        <div className="rounded-[24px] bg-slate-50 p-5">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <CircleDollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Chi phí nhập ước tính</p>
              <p className="text-2xl font-semibold">{formatCurrency(metrics.estimatedRestockCost)}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Tương đương khoảng {formatCurrency(metrics.estimatedRevenue)} doanh thu tiềm năng nếu bán hết lô hàng gợi ý.</p>
        </div>

        <div className="rounded-[24px] bg-slate-50 p-5">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Nhịp bán trailing 7 ngày</p>
              <p className="text-2xl font-semibold">{metrics.averageDailyUnits.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} / ngày</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Hôm nay đã bán {item.unitsSoldToday} đơn vị, cao hơn nhịp bình quân gần đây.</p>
        </div>
      </div>

      {metrics.needsCapitalSupport ? (
        <div className="mx-6 mb-6 rounded-[28px] border border-amber-200 bg-[linear-gradient(135deg,rgba(254,243,199,0.9)_0%,rgba(255,251,235,0.96)_100%)] p-5 text-amber-950 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Gợi ý vốn theo ngữ cảnh</p>
              <h4 className="mt-2 text-xl font-semibold">Cần hỗ trợ vốn nhập hàng?</h4>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-900/80">
                Sản phẩm này bán nhanh, tồn kho đã xuống dưới ngưỡng an toàn và chi phí nhập lại đang tạo áp lực tiền mặt ngắn hạn. Có thể cân nhắc giải pháp vốn để giữ hàng cho ca cao điểm.
              </p>
            </div>
            <div className="rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
              Khoản nhập dự kiến: {formatCurrency(metrics.estimatedRestockCost)}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row">
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900">
          Nhập hàng
          <PackagePlus className="h-4 w-4" />
        </button>
        {metrics.needsCapitalSupport ? (
          <button
            type="button"
            onClick={() =>
              onOpenCapitalSolution?.({
                source: 'reorder-suggestion-card',
                context: 'restock',
                itemName: item.name,
                sku: item.sku,
              })
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3.5 text-sm font-semibold text-amber-800 transition hover:-translate-y-0.5 hover:bg-amber-100"
          >
            Xem giải pháp vốn
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ReorderSuggestionCard
