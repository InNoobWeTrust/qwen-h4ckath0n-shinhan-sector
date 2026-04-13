import { CalendarRange, Search } from 'lucide-react'

const channelOptions = ['Tất cả', 'POS', 'Shopee', 'TikTok', 'MoMo']
const statusOptions = ['Tất cả', 'Chờ xử lý', 'Đang giao', 'Đã hoàn thành', 'Đã hủy', 'Hoàn trả']
const settlementOptions = ['Tất cả', 'Đã đối soát', 'Chưa đối soát']
const dateOptions = ['Hôm nay', '7 ngày gần nhất', 'Tháng này']

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${value === option ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200' : 'bg-slate-100 text-slate-500 hover:text-slate-700'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function OrdersFilterBar({ search, onSearchChange, filters, onFilterChange }) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tìm đơn hàng</p>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm theo mã đơn, khách hàng hoặc tên sản phẩm"
              className="w-full rounded-[24px] border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Khoảng thời gian</p>
          <div className="flex flex-wrap gap-2 rounded-[24px] bg-slate-100 p-2">
            {dateOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onFilterChange('dateRange', option)}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${filters.dateRange === option ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <CalendarRange className="h-4 w-4" />
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <FilterGroup label="Kênh bán" options={channelOptions} value={filters.channel} onChange={(value) => onFilterChange('channel', value)} />
        <FilterGroup label="Trạng thái" options={statusOptions} value={filters.status} onChange={(value) => onFilterChange('status', value)} />
        <FilterGroup label="Đối soát" options={settlementOptions} value={filters.settlement} onChange={(value) => onFilterChange('settlement', value)} />
      </div>
    </div>
  )
}

export default OrdersFilterBar
