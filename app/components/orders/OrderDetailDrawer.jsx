import { FilePlus2, Printer, Truck, X } from 'lucide-react'
import ChannelBadge from './ChannelBadge'
import SettlementStatusPill from './SettlementStatusPill'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function getPaymentLabel(status) {
  const labels = {
    paid: 'Đã thanh toán',
    pending: 'Chờ thanh toán',
    failed: 'Thanh toán lỗi',
  }

  return labels[status] ?? 'Chờ thanh toán'
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

function DetailRow({ label, value, tone = 'text-slate-900' }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${tone}`}>{value}</span>
    </div>
  )
}

function OrderDetailDrawer({ order, open, onClose }) {
  if (!order) {
    return null
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/35 transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`fixed right-0 top-0 z-50 h-full w-full max-w-[520px] transform overflow-y-auto border-l border-white/40 bg-white/95 p-6 shadow-[-20px_0_60px_rgba(15,23,42,0.16)] backdrop-blur transition duration-300 sm:p-8 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Chi tiết đơn hàng</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{order.orderId}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <ChannelBadge channel={order.channel} />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{order.createdAt}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Thông tin khách hàng</p>
            <div className="mt-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-lg font-semibold text-slate-900">{order.customerLabel}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Theo dõi thanh toán, tiến độ giao hàng và đối soát từ một màn hình duy nhất.</p>
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Trạng thái vận hành</p>
            <div className="mt-3 grid gap-3">
              <DetailRow label="Thanh toán" value={getPaymentLabel(order.paymentStatus)} tone={order.paymentStatus === 'paid' ? 'text-emerald-700' : order.paymentStatus === 'failed' ? 'text-red-700' : 'text-amber-700'} />
              <DetailRow label="Xử lý đơn" value={getFulfillmentLabel(order.fulfillmentStatus)} />
              <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Đối soát</span>
                  <SettlementStatusPill status={order.settlementStatus} />
                </div>
                <p className="mt-2 text-right text-xs text-slate-500">ETA: {order.settlementEta || 'Đã đối soát xong'}</p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Dòng hàng</p>
            <div className="mt-3 space-y-3">
              {order.items.map((item) => (
                <div key={`${order.orderId}-${item.name}`} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">Số lượng {item.qty} x {formatCurrency(item.price)}</p>
                    </div>
                    <p className="font-semibold text-slate-900">{formatCurrency(item.qty * item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Tổng kết</p>
            <div className="mt-3 space-y-3">
              <DetailRow label="Tạm tính" value={formatCurrency(order.subtotal ?? order.orderTotal)} />
              <DetailRow label="Giảm giá" value={formatCurrency(order.discount ?? 0)} />
              <DetailRow label="Thuế" value={formatCurrency(order.tax ?? 0)} />
              <div className="rounded-[24px] bg-slate-950 px-4 py-4 text-white">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-300">Tổng thanh toán</span>
                  <span className="text-lg font-semibold">{formatCurrency(order.orderTotal)}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-3">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-4 text-sm font-semibold text-white transition hover:bg-slate-900">
              <Printer className="h-4 w-4" />
              In biên lai
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
              <FilePlus2 className="h-4 w-4" />
              Tạo hóa đơn
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-50 px-4 py-4 text-sm font-semibold text-sky-700 transition hover:bg-sky-100">
              <Truck className="h-4 w-4" />
              Đánh dấu đã giao
            </button>
          </section>
        </div>
      </aside>
    </>
  )
}

export default OrderDetailDrawer
