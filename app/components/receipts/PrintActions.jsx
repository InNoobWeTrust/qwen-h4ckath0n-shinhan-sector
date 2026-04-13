import { FilePlus2, Printer, ReceiptText } from 'lucide-react'

function PrintActions({ latestReceipt, selectedReceipt, onOpenLatest, onReprint, onIssueInvoice }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        onClick={onOpenLatest}
        className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
      >
        <ReceiptText className="h-4 w-4" />
        In biên lai gần nhất
      </button>
      <button
        type="button"
        onClick={onReprint}
        className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-sky-50 px-5 py-4 text-sm font-semibold text-sky-800 ring-1 ring-sky-100 transition hover:bg-sky-100"
      >
        <Printer className="h-4 w-4" />
        In lại
      </button>
      <button
        type="button"
        onClick={onIssueInvoice}
        className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100 transition hover:bg-emerald-100"
      >
        <FilePlus2 className="h-4 w-4" />
        Tạo hóa đơn
      </button>
      <div className="sm:col-span-3 rounded-[24px] bg-slate-50 px-5 py-4 text-sm text-slate-600 ring-1 ring-slate-200">
        Đang chọn <span className="font-semibold text-slate-900">{selectedReceipt?.receiptId ?? latestReceipt?.receiptId}</span> để thao tác in, gửi hoặc xuất hóa đơn.
      </div>
    </div>
  )
}

export default PrintActions
