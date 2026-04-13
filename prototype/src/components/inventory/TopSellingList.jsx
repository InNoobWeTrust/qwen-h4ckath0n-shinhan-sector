import { Flame, TrendingUp } from 'lucide-react'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function getStatus(item) {
  if (item.stockOnHand === 0) {
    return { label: 'Hết hàng', tone: 'bg-red-100 text-red-700' }
  }

  if (item.stockOnHand <= item.reorderPoint) {
    return { label: 'Sắp hết', tone: 'bg-amber-100 text-amber-700' }
  }

  return { label: 'OK', tone: 'bg-emerald-100 text-emerald-700' }
}

function TopSellingList({ items, selectedSku, onSelect }) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Sản phẩm bán chạy</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Top SKU kéo doanh thu 7 ngày gần nhất</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Các SKU vừa bán mạnh vừa thấp hàng được đánh dấu để ưu tiên châm thêm trong ngày.</p>
        </div>
        <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => {
          const status = getStatus(item)
          const urgent = item.stockOnHand <= item.reorderPoint

          return (
            <button
              key={item.sku}
              type="button"
              onClick={() => onSelect(item)}
              className={`flex w-full items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/50 ${selectedSku === item.sku ? 'ring-2 ring-sky-300' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">#{index + 1}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</span>
                    {urgent ? <Flame className="h-4 w-4 text-amber-500" /> : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{item.unitsSold7d} đơn vị / 7 ngày • Còn {item.stockOnHand} đơn vị</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-900">{formatCurrency(item.unitsSold7d * item.pricePerUnit)}</p>
                <p className="mt-1 text-sm text-slate-500">Doanh thu 7 ngày</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TopSellingList
