import { CircleX, FilePlus2, Mail, Printer } from 'lucide-react'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function ReceiptPreviewModal({ receipt, open, onClose }) {
  if (!open || !receipt) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Xem trước biên lai</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{receipt.receiptId}</h2>
            <p className="mt-2 text-sm text-slate-500">{receipt.channel} • {receipt.issuedAt} • Thu ngân {receipt.cashierName}</p>
          </div>
          <button type="button" className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose}>
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="rounded-[28px] bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="border-b border-dashed border-slate-300 pb-5 text-center">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Shinhan Soft POS</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">Cửa hàng tiện lợi 24/7</p>
              <p className="mt-2 text-sm text-slate-500">Biên lai bán hàng • {receipt.customerName || 'Khách lẻ'}</p>
            </div>

            <div className="mt-5 space-y-3">
              {receipt.lineItems.map((item) => (
                <div key={`${receipt.receiptId}-${item.name}`} className="flex items-start justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">Số lượng {item.qty}</p>
                  </div>
                  <p className="font-semibold text-slate-900">{formatCurrency(item.price)}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-dashed border-slate-300 pt-5 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Tạm tính</span>
                <span>{formatCurrency(receipt.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Giảm giá</span>
                <span>{formatCurrency(receipt.discount)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Thuế</span>
                <span>{formatCurrency(receipt.tax)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-slate-900">
                <span>Tổng thanh toán</span>
                <span>{formatCurrency(receipt.total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-100">Thao tác nhanh</p>
              <div className="mt-4 space-y-3">
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-sky-900 transition hover:bg-sky-50">
                  <Printer className="h-4 w-4" />
                  In biên lai
                </button>
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  <Mail className="h-4 w-4" />
                  Gửi biên lai
                </button>
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100">
                  <FilePlus2 className="h-4 w-4" />
                  Xuất hóa đơn
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Trạng thái chứng từ</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">In biên lai: <span className="font-semibold text-slate-900">{receipt.printStatus === 'printed' ? 'Đã in' : 'Chưa in'}</span></div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">Hóa đơn: <span className="font-semibold text-slate-900">{receipt.invoiceStatus === 'issued' ? 'Đã xuất hóa đơn' : 'Chưa xuất hóa đơn'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPreviewModal
