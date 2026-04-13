import { useMemo, useState } from 'react'
import { Boxes, LayoutGrid, List, PackagePlus, SearchSlash, TriangleAlert } from 'lucide-react'
import { inventoryItems } from '../../data/mockData'
import InventoryTable from './InventoryTable'
import LowStockPanel from './LowStockPanel'
import ReorderSuggestionCard from './ReorderSuggestionCard'
import TopSellingList from './TopSellingList'

const filters = [
  { id: 'tat-ca', label: 'Tất cả' },
  { id: 'sap-het', label: 'Sắp hết' },
  { id: 'het-hang', label: 'Hết hàng' },
]

function getStatus(item) {
  if (item.stockOnHand === 0) {
    return 'het-hang'
  }

  if (item.stockOnHand <= item.reorderPoint) {
    return 'sap-het'
  }

  return 'ok'
}

function InventoryOverview({ onOpenCapitalSolution, onOpenCapitalDetails }) {
  const [activeFilter, setActiveFilter] = useState('tat-ca')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedSku, setSelectedSku] = useState(() => inventoryItems.find((item) => item.stockOnHand <= item.reorderPoint)?.sku ?? inventoryItems[0]?.sku)

  const stats = useMemo(() => {
    const lowStockCount = inventoryItems.filter((item) => item.stockOnHand > 0 && item.stockOnHand <= item.reorderPoint).length
    const outOfStockCount = inventoryItems.filter((item) => item.stockOnHand === 0).length

    return {
      totalItems: inventoryItems.length,
      lowStockCount,
      outOfStockCount,
    }
  }, [])

  const lowStockItems = useMemo(
    () => [...inventoryItems].filter((item) => item.stockOnHand <= item.reorderPoint).sort((a, b) => a.estimatedDaysRemaining - b.estimatedDaysRemaining),
    [],
  )

  const topSellingItems = useMemo(() => [...inventoryItems].sort((a, b) => b.unitsSold7d - a.unitsSold7d).slice(0, 5), [])

  const filteredItems = useMemo(() => {
    if (activeFilter === 'sap-het') {
      return inventoryItems.filter((item) => getStatus(item) === 'sap-het')
    }

    if (activeFilter === 'het-hang') {
      return inventoryItems.filter((item) => getStatus(item) === 'het-hang')
    }

    return inventoryItems
  }, [activeFilter])

  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.sku === selectedSku) ?? filteredItems[0] ?? inventoryItems.find((item) => item.sku === selectedSku) ?? null,
    [filteredItems, selectedSku],
  )

  const onSelectItem = (item) => {
    setSelectedSku(item.sku)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-100">
              <Boxes className="h-4 w-4" />
              Kho hàng
            </div>
            <h2 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Điều phối tồn kho theo nhịp bán thực tế
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Theo dõi SKU sắp hết, phát hiện mặt hàng bán chạy có nguy cơ đứt hàng và châm thêm đúng lúc trước ca cao điểm.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900">
            Nhập hàng mới
            <PackagePlus className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
              <p className="text-sm text-sky-100">Tổng mặt hàng</p>
              <p className="mt-3 text-3xl font-semibold">{stats.totalItems}</p>
              <p className="mt-2 text-sm text-slate-300">SKU đang theo dõi trong cửa hàng</p>
            </div>
            <div className="rounded-[28px] bg-amber-50 p-5 ring-1 ring-amber-100">
              <p className="text-sm text-amber-700">Sắp hết hàng</p>
              <p className="mt-3 text-3xl font-semibold text-amber-900">{stats.lowStockCount}</p>
              <p className="mt-2 text-sm text-amber-800">SKU còn hàng nhưng đã xuống dưới ngưỡng nhập lại</p>
            </div>
            <div className="rounded-[28px] bg-red-50 p-5 ring-1 ring-red-100">
              <p className="text-sm text-red-700">Hết hàng</p>
              <p className="mt-3 text-3xl font-semibold text-red-900">{stats.outOfStockCount}</p>
              <p className="mt-2 text-sm text-red-800">SKU cần xử lý gấp để tránh mất doanh thu</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <div className="flex flex-wrap gap-2 rounded-[24px] bg-slate-100 p-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${activeFilter === filter.id ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-[24px] bg-slate-100 p-2">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewMode === 'grid' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutGrid className="h-4 w-4" />
                Lưới
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewMode === 'list' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <List className="h-4 w-4" />
                Danh sách
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_380px]">
        <LowStockPanel
          items={lowStockItems}
          selectedSku={selectedItem?.sku}
          onSelect={onSelectItem}
          onOpenCapitalSolution={onOpenCapitalSolution}
          onOpenCapitalDetails={onOpenCapitalDetails}
        />
        <TopSellingList items={topSellingItems} selectedSku={selectedItem?.sku} onSelect={onSelectItem} />
      </section>

      <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Danh sách tồn kho</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Theo dõi toàn bộ SKU và hành động châm hàng</h3>
          </div>
          <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700">
            Đang hiển thị {filteredItems.length} / {inventoryItems.length} SKU
          </div>
        </div>

        <div className="mt-6">
          {filteredItems.length > 0 ? (
            <InventoryTable items={filteredItems} selectedSku={selectedItem?.sku} onSelect={onSelectItem} viewMode={viewMode} />
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
                <SearchSlash className="h-6 w-6" />
              </div>
              <p className="mt-4 text-lg font-semibold text-slate-900">Không có SKU phù hợp bộ lọc</p>
              <p className="mt-2 text-sm text-slate-500">Thử chuyển sang bộ lọc khác để xem toàn bộ tồn kho đang theo dõi.</p>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
        <ReorderSuggestionCard item={selectedItem} onOpenCapitalSolution={onOpenCapitalSolution} onOpenCapitalDetails={onOpenCapitalDetails} />

        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
              <TriangleAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Ưu tiên trong ca</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Mốc xử lý khuyến nghị</h3>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              Kiểm tra lại SKU <span className="font-semibold text-slate-900">hết hàng</span> trước 15:00 để tránh hụt đơn giao nhanh.
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              Ưu tiên các sản phẩm có nhãn <span className="font-semibold text-slate-900">Sắp hết</span> nhưng đang nằm trong top bán chạy 7 ngày.
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              Chỉ gợi ý <span className="font-semibold text-slate-900">hỗ trợ vốn</span> khi SKU có nhu cầu nhập thực, bán đều và chi phí nhập tạo áp lực tiền mặt.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InventoryOverview
