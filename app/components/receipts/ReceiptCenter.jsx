import { useMemo, useState } from 'react'
import { Plus, Receipt, Search } from 'lucide-react'
import { receipts } from '../../data/mockData'
import PrintActions from './PrintActions'
import ReceiptList from './ReceiptList'
import ReceiptPreviewModal from './ReceiptPreviewModal'

const channelFilters = ['Tất cả', 'POS Shinhan', 'Shopee', 'TikTok Shop', 'MoMo']

function ReceiptCenter() {
  const [search, setSearch] = useState('')
  const [activeChannel, setActiveChannel] = useState('Tất cả')
  const [selectedReceipt, setSelectedReceipt] = useState(receipts[0] ?? null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      const matchesChannel = activeChannel === 'Tất cả' || receipt.channel === activeChannel
      const keyword = search.trim().toLowerCase()

      const matchesSearch =
        keyword.length === 0 ||
        receipt.receiptId.toLowerCase().includes(keyword) ||
        receipt.orderId.toLowerCase().includes(keyword) ||
        (receipt.customerName || 'Khách lẻ').toLowerCase().includes(keyword) ||
        receipt.cashierName.toLowerCase().includes(keyword)

      return matchesChannel && matchesSearch
    })
  }, [activeChannel, search])

  const openReceipt = (receipt) => {
    setSelectedReceipt(receipt)
    setIsPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-100">
              <Receipt className="h-4 w-4" />
              Biên lai
            </div>
            <h2 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Trung tâm biên lai và hóa đơn trong ngày
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Tìm nhanh chứng từ cần in lại, gửi cho khách hoặc chuyển sang hóa đơn điện tử ngay tại quầy.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900">
            In biên lai mới
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm theo mã biên lai, đơn hàng, khách hoặc thu ngân"
                className="w-full rounded-[24px] border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2 rounded-[24px] bg-slate-100 p-2">
              {channelFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveChannel(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${activeChannel === filter ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Danh sách gần đây</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{filteredReceipts.length}</p>
            <p className="mt-2 text-sm text-slate-600">Chứng từ phù hợp bộ lọc hiện tại, sẵn sàng mở xem trước hoặc in lại.</p>
          </div>
        </div>
      </section>

      <PrintActions
        latestReceipt={receipts[0]}
        selectedReceipt={selectedReceipt}
        onOpenLatest={() => openReceipt(receipts[0])}
        onReprint={() => openReceipt(selectedReceipt ?? receipts[0])}
        onIssueInvoice={() => openReceipt(selectedReceipt ?? receipts[0])}
      />

      <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Biên lai gần đây</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Danh sách chứng từ thực tế trong ngày</h3>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">Nhấp vào từng dòng để mở xem trước</div>
        </div>

        <div className="mt-6">
          <ReceiptList receipts={filteredReceipts} selectedReceiptId={selectedReceipt?.receiptId} onSelectReceipt={openReceipt} />
        </div>
      </section>

      <ReceiptPreviewModal receipt={selectedReceipt} open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  )
}

export default ReceiptCenter
