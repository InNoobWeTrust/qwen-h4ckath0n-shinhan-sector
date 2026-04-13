import { useMemo, useState } from 'react'
import { ClipboardList, Layers3 } from 'lucide-react'
import { orders } from '../../data/mockData'
import SettlementGapCard from '../capital/SettlementGapCard'
import OrderDetailDrawer from './OrderDetailDrawer'
import OrdersFilterBar from './OrdersFilterBar'
import OrdersTable from './OrdersTable'

function normalizeChannel(channel) {
  if (channel === 'POS Shinhan') {
    return 'POS'
  }

  if (channel === 'TikTok Shop') {
    return 'TikTok'
  }

  if (channel === 'MoMo Wallet') {
    return 'MoMo'
  }

  return channel
}

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function OrdersHub({ onOpenCapitalSolution, onOpenCapitalDetails }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    channel: 'Tất cả',
    status: 'Tất cả',
    settlement: 'Tất cả',
    dateRange: 'Hôm nay',
  })
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.orderId ?? null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [settlementCardDismissed, setSettlementCardDismissed] = useState(false)

  const channelSummary = useMemo(() => {
    return [
      { label: 'POS', count: orders.filter((order) => order.channel === 'POS Shinhan').length, tone: 'bg-sky-50 text-sky-800 ring-sky-100' },
      { label: 'Shopee', count: orders.filter((order) => order.channel === 'Shopee').length, tone: 'bg-orange-50 text-orange-800 ring-orange-100' },
      { label: 'TikTok', count: orders.filter((order) => order.channel === 'TikTok Shop').length, tone: 'bg-rose-50 text-rose-800 ring-rose-100' },
      { label: 'MoMo', count: orders.filter((order) => order.channel === 'MoMo Wallet').length, tone: 'bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-100' },
    ]
  }, [])

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return orders.filter((order) => {
      const matchesChannel = filters.channel === 'Tất cả' || normalizeChannel(order.channel) === filters.channel
      const fulfillmentMap = {
        'Tất cả': true,
        'Chờ xử lý': order.fulfillmentStatus === 'pending',
        'Đang giao': order.fulfillmentStatus === 'shipped',
        'Đã hoàn thành': order.fulfillmentStatus === 'completed',
        'Đã hủy': order.fulfillmentStatus === 'cancelled',
        'Hoàn trả': order.fulfillmentStatus === 'returned',
      }
      const matchesStatus = fulfillmentMap[filters.status] ?? true
      const matchesSettlement =
        filters.settlement === 'Tất cả' ||
        (filters.settlement === 'Đã đối soát' && order.settlementStatus === 'settled') ||
        (filters.settlement === 'Chưa đối soát' && order.settlementStatus !== 'settled')
      const matchesSearch =
        keyword.length === 0 ||
        order.orderId.toLowerCase().includes(keyword) ||
        order.customerLabel.toLowerCase().includes(keyword) ||
        order.items.some((item) => item.name.toLowerCase().includes(keyword))

      return matchesChannel && matchesStatus && matchesSettlement && matchesSearch
    })
  }, [filters, search])

  const selectedOrder = useMemo(() => {
    return filteredOrders.find((order) => order.orderId === selectedOrderId) ?? filteredOrders[0] ?? null
  }, [filteredOrders, selectedOrderId])

  const pendingSettlement = filteredOrders.filter((order) => order.settlementStatus !== 'settled')
  const delayedSettlement = filteredOrders.filter((order) => order.settlementStatus === 'delayed')
  const delayedSettlementAmount = delayedSettlement.reduce((sum, order) => sum + order.orderTotal, 0)
  const latestDelayLabel = delayedSettlement[0]?.settlementEta ?? 'Đang chờ cập nhật'

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
    setVisibleCount(6)
    setDrawerOpen(false)
  }

  const handleSelectOrder = (order) => {
    setSelectedOrderId(order.orderId)
    setDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-100">
              <ClipboardList className="h-4 w-4" />
              Đơn hàng
            </div>
            <h2 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Đơn hàng đa kênh
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Gộp một hàng chờ duy nhất cho POS, Shopee, TikTok và MoMo để xử lý đơn, đối soát và theo dõi dòng tiền trong ngày.
            </p>
          </div>

          <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] lg:max-w-[320px]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-sky-100">Hàng chờ hợp nhất</p>
                <p className="mt-1 text-2xl font-semibold">{filteredOrders.length} đơn</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">{pendingSettlement.length} đơn chưa đối soát, {delayedSettlement.length} đơn trễ cần ưu tiên xử lý.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {channelSummary.map((channel) => (
            <div key={channel.label} className={`rounded-[28px] p-5 ring-1 ${channel.tone}`}>
              <p className="text-sm">{channel.label}</p>
              <p className="mt-3 text-3xl font-semibold">{channel.count}</p>
              <p className="mt-2 text-sm opacity-80">Đơn đang kết nối trong hàng chờ hợp nhất</p>
            </div>
          ))}
        </div>
      </section>

      <OrdersFilterBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setVisibleCount(6)
          setDrawerOpen(false)
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_320px]">
          <OrdersTable
            orders={filteredOrders}
            visibleCount={visibleCount}
            selectedOrderId={selectedOrder?.orderId}
          onSelectOrder={handleSelectOrder}
          onLoadMore={() => setVisibleCount((current) => current + 4)}
        />

        <div className="space-y-6">
          {delayedSettlement.length > 0 && !settlementCardDismissed ? (
            <SettlementGapCard
              pendingAmount={delayedSettlementAmount}
              delayDuration={latestDelayLabel}
              delayedCount={delayedSettlement.length}
              onViewSolution={() =>
                onOpenCapitalSolution({
                  source: 'orders-hub',
                  context: 'settlement-gap',
                  delayedCount: delayedSettlement.length,
                  pendingAmount: delayedSettlementAmount,
                })
              }
              onViewDetails={() =>
                onOpenCapitalDetails({
                  source: 'orders-hub',
                  context: 'settlement-gap',
                  delayedCount: delayedSettlement.length,
                  pendingAmount: delayedSettlementAmount,
                })
              }
              onDismiss={() => setSettlementCardDismissed(true)}
            />
          ) : null}

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Theo dõi đối soát</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Dòng tiền đang chờ về tài khoản</h3>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <p className="text-sm text-emerald-700">Đã đối soát</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-900">{filteredOrders.filter((order) => order.settlementStatus === 'settled').length} đơn</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
                <p className="text-sm text-amber-700">Đang chờ đối soát</p>
                <p className="mt-2 text-2xl font-semibold text-amber-900">{pendingSettlement.length} đơn</p>
              </div>
              <div className="rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
                <p className="text-sm text-red-700">Giá trị trễ</p>
                <p className="mt-2 text-2xl font-semibold text-red-900">{formatCurrency(delayedSettlementAmount)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Giá trị cốt lõi</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Tất cả đơn hàng trong một nơi</h3>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-4">Không cần chuyển qua lại giữa giao dịch tại quầy, sàn và ví điện tử.</div>
              <div className="rounded-2xl bg-slate-50 p-4">Nhận biết ngay đơn chậm đối soát để quản lý dòng tiền cuối ngày.</div>
              <div className="rounded-2xl bg-slate-50 p-4">Mở chi tiết đơn để in biên lai, tạo hóa đơn và đánh dấu đã giao.</div>
            </div>
          </div>
        </div>
      </div>

      <OrderDetailDrawer order={selectedOrder} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}

export default OrdersHub
