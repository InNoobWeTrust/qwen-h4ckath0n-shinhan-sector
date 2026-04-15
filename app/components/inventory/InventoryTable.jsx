import { Eye, PackagePlus, PackageSearch } from 'lucide-react'

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

function InventoryThumbnail() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.14)_0%,rgba(16,185,129,0.14)_100%)] text-sky-700 ring-1 ring-sky-100">
      <PackageSearch className="h-5 w-5" />
    </div>
  )
}

function InventoryTable({ items, selectedSku, onSelect, viewMode = 'list' }) {
  if (viewMode === 'grid') {
    return (
      <div className="grid gap-3 xl:grid-cols-2">
        {items.map((item) => {
          const status = getStatus(item)

          return (
            <button
              key={item.sku}
              type="button"
              onClick={() => onSelect(item)}
              className={`rounded-[24px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 ${selectedSku === item.sku ? 'ring-2 ring-sky-300' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <InventoryThumbnail />
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.sku} • {item.category}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <p>Tồn kho: <span className="font-semibold text-slate-900">{item.stockOnHand}</span></p>
                <p>Đã bán hôm nay: <span className="font-semibold text-slate-900">{item.unitsSoldToday}</span></p>
                <p>Đã bán 7 ngày: <span className="font-semibold text-slate-900">{item.unitsSold7d}</span></p>
                <p>Giá vốn: <span className="font-semibold text-slate-900">{formatCurrency(item.costPerUnit)}</span></p>
              </div>

              <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                  <PackagePlus className="h-3.5 w-3.5" />
                  Nhập hàng
                </span>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700">
                  <Eye className="h-3.5 w-3.5" />
                  Chi tiết
                </span>
              </div>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <th className="px-4">Hình ảnh</th>
            <th className="px-4">Tên sản phẩm</th>
            <th className="px-4">SKU</th>
            <th className="px-4">Danh mục</th>
            <th className="px-4">Tồn kho</th>
            <th className="px-4">Đã bán</th>
            <th className="px-4">Trạng thái</th>
            <th className="px-4 text-right">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = getStatus(item)

            return (
              <tr
                key={item.sku}
                className={`cursor-pointer rounded-[24px] bg-slate-50 text-sm text-slate-600 transition hover:bg-sky-50/70 ${selectedSku === item.sku ? 'ring-2 ring-inset ring-sky-300' : ''}`}
                onClick={() => onSelect(item)}
              >
                <td className="rounded-l-[24px] px-4 py-4">
                  <InventoryThumbnail />
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatCurrency(item.pricePerUnit)} / bán lẻ</p>
                </td>
                <td className="px-4 py-4 font-medium text-slate-700">{item.sku}</td>
                <td className="px-4 py-4">{item.category}</td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{item.stockOnHand} đơn vị</p>
                  <p className="mt-1 text-xs text-slate-500">Ngưỡng nhập lại {item.reorderPoint}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">Hôm nay {item.unitsSoldToday}</p>
                  <p className="mt-1 text-xs text-slate-500">7 ngày {item.unitsSold7d}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.tone}`}>{status.label}</span>
                </td>
                <td className="rounded-r-[24px] px-4 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onSelect(item)
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-900"
                    >
                      <PackagePlus className="h-3.5 w-3.5" />
                      Nhập hàng
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onSelect(item)
                      }}
                      className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Chi tiết
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default InventoryTable
