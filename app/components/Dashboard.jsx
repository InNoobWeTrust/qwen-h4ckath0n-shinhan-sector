import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  PackageOpen,
  Printer,
  Receipt,
  ScanSearch,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  UserRound,
} from 'lucide-react'
import CreditScoreModal from './CreditScoreModal'
import CreditScorePanel from './CreditScorePanel'
import LoanApplicationModal from './LoanApplicationModal'
import RevenueChart from './RevenueChart'
import {
  inventoryItems,
  receipts,
  revenueData,
  staffMembers,
  transactions,
} from '../data/mockData'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function formatShortCurrency(amount) {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} triệu VND`
  }

  return formatCurrency(amount)
}

function getReceiptPrintLabel(status) {
  return status === 'printed' ? 'Đã in' : 'Chưa in'
}

function getReceiptInvoiceLabel(status) {
  return status === 'issued' ? 'Đã xuất hóa đơn' : 'Chưa xuất hóa đơn'
}

const merchants = [
  { id: 'M1', label: 'M1: Chị Linh', name: 'Chị Linh' },
  { id: 'M2', label: 'M2: Anh Hùng', name: 'Anh Hùng' },
  { id: 'M3', label: 'M3: Chị Mai', name: 'Chị Mai' },
]

function OverviewCard({ label, title, value, detail, change, icon, accent = 'sky' }) {
  const IconComponent = icon
  const accents = {
    sky: {
      ring: 'bg-sky-500/12 text-sky-700',
      glow: 'from-sky-500/18 to-cyan-400/10',
      line: 'bg-sky-500',
      value: 'text-sky-700',
    },
    emerald: {
      ring: 'bg-emerald-500/12 text-emerald-700',
      glow: 'from-emerald-500/18 to-teal-400/10',
      line: 'bg-emerald-500',
      value: 'text-emerald-700',
    },
    amber: {
      ring: 'bg-amber-500/12 text-amber-700',
      glow: 'from-amber-500/18 to-orange-400/10',
      line: 'bg-amber-500',
      value: 'text-amber-700',
    },
    slate: {
      ring: 'bg-slate-500/12 text-slate-700',
      glow: 'from-slate-500/15 to-slate-300/10',
      line: 'bg-slate-500',
      value: 'text-slate-800',
    },
  }

  const palette = accents[accent] ?? accents.sky

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.glow} opacity-0 transition duration-300 group-hover:opacity-100`} />
      <div className={`absolute left-0 top-6 h-16 w-1 rounded-r-full ${palette.line}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{title}</p>
          <p className={`mt-2 text-xl font-semibold ${palette.value}`}>{value}</p>
          <p className="mt-2 text-sm text-slate-500">{detail}</p>
        </div>
        <div className={`rounded-2xl p-3 ${palette.ring}`}>
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
      <p className="relative mt-5 text-sm font-medium text-emerald-600">{change}</p>
    </div>
  )
}

function Dashboard() {
  const metrics = useMemo(() => {
    const todayRevenue = Math.round(revenueData.reduce((sum, item) => sum + item.revenue, 0) * 1000000)
    const activeOrders = transactions.filter((item) => item.fulfillmentStatus !== 'Hoàn tất').length
    const lowStock = inventoryItems.filter((item) => item.stockOnHand <= item.reorderPoint)
    const activeStaff = staffMembers.filter((item) => item.shiftStatus === 'on')
    const latestReceipt = receipts[0]

    return {
      todayRevenue,
      activeOrders,
      lowStock,
      activeStaff,
      latestReceipt,
    }
  }, [])

  const topSellingItems = useMemo(
    () => [...inventoryItems].sort((a, b) => b.unitsSold7d - a.unitsSold7d).slice(0, 4),
    [],
  )

  const [selectedMerchant, setSelectedMerchant] = useState('M1')
  const [scoreData, setScoreData] = useState(null)
  const [scoreModalOpen, setScoreModalOpen] = useState(false)
  const [loanModalOpen, setLoanModalOpen] = useState(false)

  useEffect(() => {
    async function fetchScore() {
      try {
        const res = await fetch('/api/credit-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ merchantId: selectedMerchant }),
        })
        const data = await res.json()
        setScoreData(data)
      } catch {
        // fallback to empty on error
        setScoreData(null)
      }
    }

    fetchScore()
  }, [selectedMerchant])

  const actionSuggestions = [
    {
      title: 'Bổ sung ngay nhóm mì ly và nước tăng lực',
      detail: '2 mã hàng còn dưới ngưỡng an toàn, dự kiến hết trước ca tối.',
      tone: 'border-amber-200 bg-amber-50 text-amber-900',
      icon: AlertTriangle,
    },
    {
      title: 'In lại biên lai đơn Shopee giao trễ',
      detail: '1 đơn đang chờ đối soát, nên in chứng từ để đối chiếu với đơn vị vận chuyển.',
      tone: 'border-sky-200 bg-sky-50 text-sky-900',
      icon: Receipt,
    },
    {
      title: 'An toàn thanh toán',
      detail: 'Chưa ghi nhận giao dịch bất thường trong 24 giờ, nhưng một ví MoMo cần đối chiếu số điện thoại người nhận.',
      tone: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      icon: ScanSearch,
    },
  ]

  return (
    <>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[36px] border border-white/20 bg-[linear-gradient(135deg,rgba(9,57,105,0.98)_0%,rgba(7,96,148,0.96)_48%,rgba(11,126,119,0.95)_100%)] p-6 text-white shadow-[0_36px_80px_rgba(8,47,73,0.34)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_340px] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-sky-50 ring-1 ring-white/15 backdrop-blur">
                <Store className="h-4 w-4" />
                Cửa Hàng Tiện Lợi 24/7 • Ngày kinh doanh 13/04/2026
              </div>
              <h2 className="mt-5 font-['Be_Vietnam_Pro',sans-serif] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Trung tâm điều hành bán hàng mỗi ngày
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-sky-50/92 sm:text-lg">
                Theo dõi doanh thu theo giờ, đơn đa kênh, tình trạng kho và nhân viên đang ca trong cùng một màn hình.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/14 px-4 py-2 text-sm font-semibold text-emerald-100 ring-1 ring-emerald-200/20">
                  <BadgeCheck className="h-4 w-4" />
                  Ca sáng 06:00 - 14:00 đang hoạt động • 3 nhân viên trong ca
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-sky-50 ring-1 ring-white/15">
                  <ShieldCheck className="h-4 w-4 text-emerald-200" />
                  Máy in biên lai sẵn sàng • Đối soát cuối ngày lúc 22:00
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-50">
                  Tạo đơn mới
                  <ShoppingCart className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/14">
                  Xem kho hàng
                  <Boxes className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/14">
                  In biên lai gần nhất
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-[0_22px_45px_rgba(15,23,42,0.16)] backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-sky-100">Tình hình vận hành hôm nay</p>
                  <p className="mt-2 text-2xl font-semibold">Ca sáng đang ổn định</p>
                  <p className="mt-2 text-sm text-sky-100">48 đơn đã hoàn tất • 4 đơn đang xử lý • 1 đơn chờ đối soát</p>
                </div>
                <div className="rounded-2xl bg-white/12 p-3 text-white ring-1 ring-white/15">
                  <ClipboardList className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-950/18 p-4 ring-1 ring-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Đơn đang xử lý</p>
                  <p className="mt-3 text-3xl font-semibold">{metrics.activeOrders}</p>
                  <p className="mt-2 text-sm text-sky-100">2 đơn tại quầy, 2 đơn từ Shopee và TikTok</p>
                </div>
                <div className="rounded-2xl bg-slate-950/18 p-4 ring-1 ring-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Cảnh báo kho</p>
                  <p className="mt-3 text-3xl font-semibold">{metrics.lowStock.length}</p>
                  <p className="mt-2 text-sm text-emerald-200">2 mã hàng cần nhập trước ca tối</p>
                </div>
              </div>

              <div className="mt-5 rounded-[26px] bg-white p-4 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
                <p className="text-sm font-medium text-slate-500">Biên lai gần nhất</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">{metrics.latestReceipt.receiptId}</p>
                    <p className="mt-1 text-sm text-slate-500">{metrics.latestReceipt.channel} • Thu ngân {metrics.latestReceipt.cashierName}</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">{formatCurrency(metrics.latestReceipt.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            label="Doanh thu hôm nay"
            title={formatShortCurrency(metrics.todayRevenue)}
            value="Theo 8 khung giờ bán hàng"
            detail="Tăng mạnh ở khung 11:00 - 13:00 và 18:00 - 20:00"
            change="Tăng 14% so với cùng ca hôm qua"
            icon={CircleDollarSign}
            accent="sky"
          />
          <OverviewCard
            label="Đơn đang xử lý"
            title={`${metrics.activeOrders} đơn`}
            value="1 đơn chờ đối soát"
            detail="Ưu tiên 2 đơn giao nhanh từ TikTok Shop và Shopee"
            change="Thời gian xử lý trung bình 6 phút/đơn"
            icon={ShoppingCart}
            accent="amber"
          />
          <OverviewCard
            label="Sản phẩm sắp hết"
            title={`${metrics.lowStock.length} mã hàng`}
            value="Mì ly cay còn 8 hộp"
            detail="Nhóm đồ uống và đồ ăn nhanh cần châm thêm trước giờ cao điểm"
            change="1 mã có nguy cơ hết trong 1,2 ngày"
            icon={PackageOpen}
            accent="emerald"
          />
          <div className="space-y-4">
            <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-sm font-medium text-slate-500">Merchant theo dõi tín nhiệm</p>
              <select
                value={selectedMerchant}
                onChange={(event) => setSelectedMerchant(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              >
                {merchants.map((merchant) => (
                  <option key={merchant.id} value={merchant.id}>
                    {merchant.label}
                  </option>
                ))}
              </select>
              <p className="mt-3 text-sm text-slate-500">Chọn merchant để cập nhật điểm tín nhiệm và hạn mức đề xuất.</p>
            </div>

            <CreditScorePanel
              scoreData={scoreData ?? {}}
              onOpenModal={() => setScoreModalOpen(true)}
              onOpenLoan={() => setLoanModalOpen(true)}
              selectedMerchantName={selectedMerchant === 'M1' ? 'Chị Linh' : selectedMerchant === 'M2' ? 'Anh Hùng' : 'Chị Mai'}
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_380px]">
          <div className="space-y-6 min-w-0">
            <RevenueChart data={revenueData} />

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Đơn hàng đa kênh</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Hàng chờ xử lý từ quầy, Shopee, TikTok và MoMo</h3>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  4 đơn đang xử lý • 1 đơn chờ đối soát
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-200 hover:bg-sky-50/50">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-slate-900">{transaction.id}</p>
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">{transaction.channel}</span>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${transaction.priority === 'Cần ưu tiên' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                            {transaction.priority}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{transaction.description}</p>
                        <p className="mt-2 text-sm text-slate-500">{transaction.time} • {transaction.customer}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Thanh toán</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{transaction.paymentStatus}</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Xử lý đơn</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{transaction.fulfillmentStatus}</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Đối soát</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{transaction.settlementStatus}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">Cảnh báo kho hàng</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Mã hàng cần nhập thêm trước ca tối</h3>
                </div>
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                  <PackageOpen className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {metrics.lowStock.map((item) => (
                  <div key={item.sku} className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-amber-900">{item.name}</p>
                        <p className="mt-1 text-sm text-amber-800">{item.stockOnHand} còn lại • Bán {item.unitsSoldToday} đơn vị hôm nay</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-800">
                        {item.estimatedDaysRemaining.toLocaleString('vi-VN')} ngày
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-amber-800">Nhà cung cấp: {item.supplier} • Điểm đặt lại: {item.reorderPoint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Nhân viên trong ca</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Theo dõi hiệu suất tại quầy theo thời gian thực</h3>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                  <UserRound className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {metrics.activeStaff.map((staff) => (
                  <div key={staff.staffId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{staff.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{staff.role} • Vào ca {staff.shiftStart}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {staff.shiftStatus}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-2xl bg-white px-3 py-3">
                        <p className="text-slate-500">Số đơn</p>
                        <p className="mt-1 font-semibold text-slate-900">{staff.salesCount}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-3">
                        <p className="text-slate-500">Doanh số</p>
                        <p className="mt-1 font-semibold text-slate-900">{formatShortCurrency(staff.salesAmount)}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-3 py-3">
                        <p className="text-slate-500">Giỏ TB</p>
                        <p className="mt-1 font-semibold text-slate-900">{formatCurrency(staff.averageBasket)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Gợi ý hành động hôm nay</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Ưu tiên các việc cần xử lý trong ca</h3>
                </div>
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {actionSuggestions.map((item) => (
                  <div key={item.title} className={`rounded-2xl border p-4 ${item.tone}`}>
                    <div className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-5 w-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 opacity-85">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_340px]">
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Sản phẩm bán chạy</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Top SKU kéo doanh thu hôm nay</h3>
              </div>
              <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {topSellingItems.map((item, index) => (
                <div key={item.sku} className="flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.category} • {item.supplier}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{item.unitsSold7d} đơn vị / 7 ngày</p>
                    <p className="mt-1 text-sm text-slate-500">Hôm nay bán {item.unitsSoldToday} đơn vị</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Biên lai và hóa đơn</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Chứng từ gần đây cần in hoặc xuất hóa đơn</h3>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Receipt className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {receipts.map((receiptItem) => (
                <div key={receiptItem.receiptId} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">{receiptItem.receiptId}</p>
                        <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">{receiptItem.channel}</span>
                      </div>
                       <p className="mt-2 text-sm text-slate-500">{receiptItem.issuedAt} • {receiptItem.cashierName} • {receiptItem.customerName || 'Khách lẻ'}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-semibold text-slate-900">{formatCurrency(receiptItem.total)}</p>
                      <p className="mt-1 text-sm text-slate-500">{receiptItem.lineItems.length} dòng hàng</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${receiptItem.printStatus === 'printed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                       {getReceiptPrintLabel(receiptItem.printStatus)}
                     </span>
                     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${receiptItem.invoiceStatus === 'issued' ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-700'}`}>
                       {getReceiptInvoiceLabel(receiptItem.invoiceStatus)}
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 p-5 text-white shadow-[0_20px_45px_rgba(15,23,42,0.24)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-100">Dòng tiền cuối ca</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Theo dõi khoản cần đối chiếu trước khi chốt ngày</h3>
              <p className="mt-3 text-sm leading-6 text-sky-100">
                Tập trung xử lý chứng từ còn treo, đơn hoàn trả và giao dịch ví điện tử cần xác nhận để tránh chậm đối soát sang ngày hôm sau.
              </p>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                  <p className="text-sky-100">Đơn cần rà soát</p>
                  <p className="mt-1 text-lg font-semibold">2 đơn hoàn trả và 1 giao dịch chờ xác nhận</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
                  <p className="text-sky-100">Mốc xử lý</p>
                  <p className="mt-1 text-lg font-semibold">Hoàn tất đối chiếu trước 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <CreditScoreModal
        open={scoreModalOpen}
        onClose={() => setScoreModalOpen(false)}
        score={scoreData?.score ?? 0}
        maxScore={850}
        change={scoreData?.change ?? ''}
        breakdown={scoreData?.breakdown ?? []}
        scores={scoreData?.scores ?? null}
        positiveFactors={scoreData?.positiveFactors ?? []}
        negativeFactors={scoreData?.negativeFactors ?? []}
        whatIf={scoreData?.whatIf ?? { condition: '', improvement: '' }}
        band={scoreData?.band ?? ''}
      />
      <LoanApplicationModal
        open={loanModalOpen}
        onClose={() => setLoanModalOpen(false)}
        initialAmount={scoreData?.limit ?? 0}
        merchantName={selectedMerchant === 'M1' ? 'Chị Linh' : selectedMerchant === 'M2' ? 'Anh Hùng' : 'Chị Mai'}
        band={scoreData?.band ?? ''}
      />
    </>
  )
}

export default Dashboard
