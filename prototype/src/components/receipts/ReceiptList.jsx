import { FilePlus2, Mail, Printer } from 'lucide-react'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function StatusBadge({ tone, children }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{children}</span>
}

function ReceiptList({ receipts = [], selectedReceiptId, onSelectReceipt }) {
  return (
    <div className="space-y-3">
      {receipts.map((receipt) => (
        <button
          key={receipt.receiptId}
          type="button"
          onClick={() => onSelectReceipt(receipt)}
          className={`w-full rounded-[28px] border p-5 text-left shadow-sm transition hover:-translate-y-0.5 ${selectedReceiptId === receipt.receiptId ? 'border-sky-200 bg-sky-50/70 ring-2 ring-sky-200' : 'border-slate-200 bg-white hover:border-sky-200'}`}
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg font-semibold text-slate-900">{receipt.receiptId}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{receipt.channel}</span>
                {receipt.printStatus === 'printed' ? <StatusBadge tone="bg-emerald-100 text-emerald-700">Đã in</StatusBadge> : <StatusBadge tone="bg-amber-100 text-amber-700">Chưa in</StatusBadge>}
                {receipt.invoiceStatus === 'issued' ? <StatusBadge tone="bg-sky-100 text-sky-700">Đã xuất hóa đơn</StatusBadge> : <StatusBadge tone="bg-slate-200 text-slate-700">Chưa xuất hóa đơn</StatusBadge>}
              </div>
              <p className="mt-3 text-sm text-slate-500">{receipt.issuedAt} • {receipt.customerName || 'Khách lẻ'} • Thu ngân {receipt.cashierName}</p>
            </div>

            <div className="text-left xl:text-right">
              <p className="text-xl font-semibold text-slate-900">{formatCurrency(receipt.total)}</p>
              <p className="mt-1 text-sm text-slate-500">{receipt.orderId} • {receipt.lineItems.length} dòng hàng</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onSelectReceipt(receipt)
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-900"
            >
              <Printer className="h-3.5 w-3.5" />
              In lại
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onSelectReceipt(receipt)
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              <FilePlus2 className="h-3.5 w-3.5" />
              Tạo hóa đơn
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onSelectReceipt(receipt)
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              <Mail className="h-3.5 w-3.5" />
              Gửi biên lai
            </button>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ReceiptList
