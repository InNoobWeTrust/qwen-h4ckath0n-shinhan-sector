import { ChevronRight, FilePlus2, Printer } from 'lucide-react'
import ChannelBadge from './ChannelBadge'
import SettlementStatusPill from './SettlementStatusPill'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function getFulfillmentLabel(status) {
  const labels = {
    pending: 'Chờ xử lý',
    shipped: 'Đang giao',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
    returned: 'Hoàn trả',
  }

  return labels[status] ?? 'Chờ xử lý'
}

function getPaymentLabel(status) {
  const labels = {
    paid: 'Đã thanh toán',
    pending: 'Chờ thanh toán',
    failed: 'Thanh toán lỗi',
  }

  return labels[status] ?? 'Chờ thanh toán'
}

function OrdersTable({ orders = [], visibleCount, selectedOrderId, onSelectOrder, onLoadMore }) {
  const visibleOrders = orders.slice(0, visibleCount)
  const hasMore = visibleCount < orders.length

  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Hàng chờ hợp nhất</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Theo dõi toàn bộ đơn từ mọi kênh trong một bảng</h3>
        </div>
        <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-700">Nhấp vào dòng để mở chi tiết đơn</div>
      </div>

      <div className="mt-6 overflow-x-auto">
        {visibleOrders.length > 0 ? (
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <th className="px-4">Mã đơn</th>
                <th className="px-4">Thời gian</th>
                <th className="px-4">Kênh</th>
                <th className="px-4">Khách hàng</th>
                <th className="px-4">Tổng tiền</th>
                <th className="px-4">Trạng thái</th>
                <th className="px-4">Đối soát</th>
                <th className="px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => {
                const isSelected = selectedOrderId === order.orderId

                return (
                  <tr
                    key={order.orderId}
                    onClick={() => onSelectOrder(order)}
                    className={`cursor-pointer text-sm text-slate-600 transition ${isSelected ? 'bg-sky-50/80' : 'bg-slate-50 hover:bg-sky-50/60'}`}
                  >
                    <td className="rounded-l-[24px] px-4 py-4">
                      <p className="font-semibold text-slate-900">{order.orderId}</p>
                      <p className="mt-1 text-xs text-slate-500">{order.items.length} dòng hàng</p>
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-700">{order.createdAt}</td>
                    <td className="px-4 py-4"><ChannelBadge channel={order.channel} /></td>
                    <td className="px-4 py-4">{order.customerLabel}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{formatCurrency(order.orderTotal)}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">{getFulfillmentLabel(order.fulfillmentStatus)}</span>
                        <p className="text-xs text-slate-500">{getPaymentLabel(order.paymentStatus)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <SettlementStatusPill status={order.settlementStatus} />
                        <p className="text-xs text-slate-500">{order.settlementEta || 'Hoàn tất'}</p>
                      </div>
                    </td>
                    <td className="rounded-r-[24px] px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            onSelectOrder(order)
                          }}
                          className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          In
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            onSelectOrder(order)
                          }}
                          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <FilePlus2 className="h-3.5 w-3.5" />
                          Hóa đơn
                        </button>
                        <span className="inline-flex items-center rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center text-sm text-slate-500">
            Không có đơn hàng phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
          >
            Tải thêm đơn hàng
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default OrdersTable
