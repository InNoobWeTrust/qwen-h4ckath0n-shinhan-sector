import { useMemo, useState } from 'react'
import { AlertTriangle, ArrowRight, Flame } from 'lucide-react'
import RestockCapitalCard from '../capital/RestockCapitalCard'

function formatDays(value) {
  if (value <= 0) {
    return 'Hết hàng ngay'
  }

  return `${value.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} ngày`
}

function getUrgency(item) {
  if (item.estimatedDaysRemaining < 1 || item.stockOnHand === 0) {
    return {
      tone: 'border-red-200 bg-red-50/90 text-red-950',
      badge: 'bg-red-100 text-red-700',
      label: 'Nguy cấp',
      accent: 'text-red-600',
    }
  }

  if (item.estimatedDaysRemaining < 3) {
    return {
      tone: 'border-amber-200 bg-amber-50/90 text-amber-950',
      badge: 'bg-amber-100 text-amber-700',
      label: 'Cần nhập sớm',
      accent: 'text-amber-600',
    }
  }

  return {
    tone: 'border-slate-200 bg-slate-50 text-slate-900',
    badge: 'bg-slate-200 text-slate-700',
    label: 'Theo dõi',
    accent: 'text-slate-500',
  }
}

function getRestockEstimate(item) {
  const averageDailyUnits = item.unitsSold7d / 7
  const suggestedReorderQuantity = Math.max(
    item.reorderPoint * 2 - item.stockOnHand,
    Math.ceil(averageDailyUnits * 10 - item.stockOnHand),
    item.reorderPoint - item.stockOnHand,
    0,
  )

  return suggestedReorderQuantity * item.costPerUnit
}

function LowStockPanel({ items, selectedSku, onSelect, onOpenCapitalSolution, onOpenCapitalDetails }) {
  const [dismissedSkus, setDismissedSkus] = useState([])

  const selectedItem = useMemo(() => items.find((item) => item.sku === selectedSku) ?? null, [items, selectedSku])
  const showRestockCapitalCard =
    selectedItem &&
    selectedItem.stockOnHand <= selectedItem.reorderPoint &&
    selectedItem.unitsSold7d >= 60 &&
    selectedItem.estimatedDaysRemaining <= 2 &&
    !dismissedSkus.includes(selectedItem.sku)

  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-600">Cảnh báo tồn kho</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Mặt hàng sắp chạm ngưỡng thiếu hàng</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Ưu tiên xử lý các SKU có số ngày còn lại thấp hơn 3 ngày để tránh lỡ doanh thu trong ca cao điểm.</p>
        </div>
        <div className="rounded-2xl bg-red-50 p-3 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const urgency = getUrgency(item)
          const isSelected = selectedSku === item.sku
          const showCapitalHint = item.unitsSold7d >= 60 && item.estimatedDaysRemaining <= 2

          return (
            <button
              key={item.sku}
              type="button"
              onClick={() => onSelect(item)}
              className={`w-full rounded-[26px] border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${urgency.tone} ${isSelected ? 'ring-2 ring-sky-300' : ''}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-base font-semibold">{item.name}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${urgency.badge}`}>{urgency.label}</span>
                    {showCapitalHint ? (
                      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">Có thể cần vốn nhập hàng</span>
                    ) : null}
                  </div>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    <p>Hiện còn <span className="font-semibold">{item.stockOnHand}</span></p>
                    <p>Điểm đặt lại <span className="font-semibold">{item.reorderPoint}</span></p>
                    <p>Dự kiến hết sau <span className="font-semibold">{formatDays(item.estimatedDaysRemaining)}</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  {item.estimatedDaysRemaining < 1 ? <Flame className={`h-4 w-4 ${urgency.accent}`} /> : null}
                  <span className="text-sm font-medium">Bán 7 ngày: {item.unitsSold7d}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                    Xem chi tiết
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {isSelected && showCapitalHint ? (
                <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700 ring-1 ring-white/80">
                  {item.name} đang vừa bán nhanh vừa gần hết hàng. Nếu cần châm thêm lô mới ngay, có thể xem thêm gợi ý hỗ trợ vốn theo đúng nhu cầu nhập hàng hiện tại.
                </div>
              ) : null}
            </button>
          )
        })}
      </div>

      {showRestockCapitalCard ? (
        <div className="mt-4">
          <RestockCapitalCard
            item={selectedItem}
            reorderCostEstimate={getRestockEstimate(selectedItem)}
            onViewSolution={() =>
              onOpenCapitalSolution({
                source: 'low-stock-panel',
                context: 'restock',
                itemName: selectedItem.name,
                sku: selectedItem.sku,
              })
            }
            onViewDetails={() =>
              onOpenCapitalDetails({
                source: 'low-stock-panel',
                context: 'restock',
                itemName: selectedItem.name,
                sku: selectedItem.sku,
              })
            }
            onDismiss={() => setDismissedSkus((current) => [...current, selectedItem.sku])}
          />
        </div>
      ) : null}
    </div>
  )
}

export default LowStockPanel
