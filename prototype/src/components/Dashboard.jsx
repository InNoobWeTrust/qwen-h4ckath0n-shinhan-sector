import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarClock,
  ChartNoAxesCombined,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Landmark,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import StatsCard from './StatsCard'
import RevenueChart from './RevenueChart'
import TransactionTable from './TransactionTable'
import CreditScoreModal from './CreditScoreModal'
import LoanApplicationModal from './LoanApplicationModal'

const revenueData = [
  { day: '06/04', pos: 6.2, marketplace: 5.8, wallet: 2.8, revenue: 14.8 },
  { day: '07/04', pos: 6.9, marketplace: 6.1, wallet: 2.9, revenue: 15.9 },
  { day: '08/04', pos: 7.1, marketplace: 6.4, wallet: 2.9, revenue: 16.4 },
  { day: '09/04', pos: 7.8, marketplace: 7.1, wallet: 3.2, revenue: 18.1 },
  { day: '10/04', pos: 7.3, marketplace: 6.7, wallet: 3.3, revenue: 17.3 },
  { day: '11/04', pos: 9.8, marketplace: 8.7, wallet: 4.1, revenue: 22.6 },
  { day: '12/04', pos: 5.1, marketplace: 4.4, wallet: 3.0, revenue: 12.5 },
]

const transactions = [
  {
    id: 'SC240412-001',
    time: '14:32',
    description: 'Bán hàng POS - nước giải khát và đồ ăn nhanh',
    amount: 1250000,
    status: 'completed',
    channel: 'POS Shinhan',
    health: 'stable',
  },
  {
    id: 'SC240412-002',
    time: '13:48',
    description: 'Thanh toán QR từ đơn TikTok Shop',
    amount: 2180000,
    status: 'completed',
    channel: 'TikTok Shop',
    health: 'growth',
  },
  {
    id: 'SC240412-003',
    time: '12:15',
    description: 'Nạp ví điện tử MoMo cho khách lẻ',
    amount: 680000,
    status: 'completed',
    channel: 'MoMo Wallet',
    health: 'stable',
  },
  {
    id: 'SC240412-004',
    time: '11:06',
    description: 'Thu hộ COD từ sàn thương mại điện tử',
    amount: 3450000,
    status: 'pending',
    channel: 'Shopee',
    health: 'review',
  },
  {
    id: 'SC240412-005',
    time: '09:41',
    description: 'Bán combo hàng tiêu dùng buổi sáng',
    amount: 940000,
    status: 'completed',
    channel: 'POS Shinhan',
    health: 'stable',
  },
]

const scoreBreakdown = [
  { label: 'Độ đều doanh thu', score: 95, description: 'Doanh thu 4 tuần liên tiếp giữ mức ổn định, biến động thấp.' },
  { label: 'Xu hướng tăng trưởng', score: 88, description: 'Kênh marketplace và POS duy trì đà tăng trưởng tháng này.' },
  { label: 'Sức khỏe dòng tiền', score: 72, description: 'Dòng tiền tốt, cần tối ưu thêm chu kỳ nhập hàng để tăng dự phòng.' },
  { label: 'Tỷ lệ hoàn trả', score: 98, description: 'Lịch sử hoàn trả gần như tuyệt đối đúng hạn.' },
  { label: 'Lịch sử thanh toán', score: 85, description: 'Không có sự kiện quá hạn lớn trong 6 tháng gần nhất.' },
]

const sourceCards = [
  {
    title: 'POS & QR tại quầy',
    value: '47 giao dịch/ngày',
    detail: 'Đối soát doanh thu, tần suất thanh toán và thời gian cao điểm bán hàng.',
    tone: 'from-sky-500/20 via-sky-400/8 to-white',
  },
  {
    title: 'Marketplace',
    value: '3 sàn đang kết nối',
    detail: 'Đo tốc độ tăng trưởng, tỷ lệ hoàn hàng, lịch sử settlement từ Shopee, Lazada, TikTok Shop.',
    tone: 'from-indigo-500/20 via-cyan-400/8 to-white',
  },
  {
    title: 'Ví điện tử',
    value: '92% giao dịch sạch',
    detail: 'Nhận diện dòng tiền thực, phát hiện ví quay vòng và hành vi bất thường từ MoMo.',
    tone: 'from-emerald-500/20 via-teal-400/8 to-white',
  },
]

const trustSignals = [
  'Giải ngân trong 72 giờ',
  'APR 15-18%/năm',
  'Hạn mức đề xuất 5-120 triệu VND',
]

const onboardingTimeline = [
  {
    day: 'Ngày 0-7',
    title: 'Kết nối dữ liệu',
    detail: 'Liên kết POS, Shopee/Lazada/TikTok Shop và ví MoMo để tạo hồ sơ giao dịch đầu tiên.',
  },
  {
    day: 'Ngày 8-30',
    title: 'Huấn luyện hồ sơ tín dụng',
    detail: 'Mô hình chuẩn hóa dòng tiền, xác định mùa vụ, biên độ biến động và hành vi settlement.',
  },
  {
    day: 'Ngày 31-60',
    title: 'Theo dõi rủi ro thời gian thực',
    detail: 'Kích hoạt cảnh báo gian lận, đối chiếu hoàn trả và chấm điểm uy tín hằng tuần.',
  },
  {
    day: 'Ngày 61-90',
    title: 'Mở hạn mức động',
    detail: 'Đề xuất khoản vay đầu tiên, điều chỉnh hạn mức theo doanh thu và lịch sử hoàn trả mới nhất.',
  },
]

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function Dashboard() {
  const [showCreditScore, setShowCreditScore] = useState(false)
  const [showLoanApplication, setShowLoanApplication] = useState(false)

  const weeklyRevenue = useMemo(
    () => revenueData.reduce((sum, item) => sum + item.revenue, 0),
    [],
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.72),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.16),_transparent_24%),linear-gradient(180deg,#eff6ff_0%,#f8fafc_38%,#f3f8ff_100%)] text-slate-700">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%)]" />
      <div className="absolute left-[-120px] top-40 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="absolute right-[-160px] top-[22rem] h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="overflow-hidden rounded-[36px] border border-white/20 bg-[linear-gradient(135deg,rgba(9,57,105,0.98)_0%,rgba(7,96,148,0.96)_48%,rgba(11,126,119,0.95)_100%)] p-6 text-white shadow-[0_36px_80px_rgba(8,47,73,0.34)] sm:p-8 lg:p-10">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.16),_transparent_48%)] lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_380px] lg:items-end">
            <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-sky-50 ring-1 ring-white/15 backdrop-blur">
                  <Store className="h-4 w-4" />
                  Nền tảng điểm tín dụng thay thế cho SME Việt Nam
                </div>
              <h1 className="mt-5 font-['Be_Vietnam_Pro',sans-serif] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Shinhan Credit Connect
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-sky-50/92 sm:text-lg">
                Chuyển dữ liệu POS, marketplace và ví điện tử thành điểm tín dụng minh bạch để ngân hàng nhìn thấy sức khỏe kinh doanh thực của SME Việt Nam.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {trustSignals.map((signal) => (
                  <div key={signal} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm text-white/95 ring-1 ring-white/15 backdrop-blur-sm">
                    <BadgeCheck className="h-4 w-4 text-emerald-200" />
                    {signal}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-sky-900 transition hover:-translate-y-0.5 hover:bg-sky-50"
                  onClick={() => setShowLoanApplication(true)}
                >
                  Mở hồ sơ vay nhanh
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/14"
                  onClick={() => setShowCreditScore(true)}
                >
                  Xem cách tính điểm tín dụng
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-[0_22px_45px_rgba(15,23,42,0.16)] backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-sky-100">Merchant đang theo dõi</p>
                  <p className="mt-2 text-2xl font-semibold">Cửa Hàng Tiện Lợi 24/7</p>
                  <p className="mt-2 text-sm text-sky-100">Merchant ID: SC001234 • Hồ Chí Minh City</p>
                </div>
                <div className="rounded-2xl bg-white/12 p-3 text-white ring-1 ring-white/15">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-950/18 p-4 ring-1 ring-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Điểm tín dụng</p>
                  <p className="mt-3 text-3xl font-semibold">745</p>
                  <p className="mt-2 text-sm text-emerald-200">Top 18% merchant cùng phân khúc</p>
                </div>
                <div className="rounded-2xl bg-slate-950/18 p-4 ring-1 ring-white/8">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-100/80">Phê duyệt</p>
                  <p className="mt-3 text-3xl font-semibold">72h</p>
                  <p className="mt-2 text-sm text-sky-100">Hồ sơ không cần tài sản đảm bảo</p>
                </div>
              </div>

              <div className="mt-5 rounded-[26px] bg-white p-4 text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.14)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Tổng doanh thu 7 ngày</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">{weeklyRevenue.toLocaleString('vi-VN')} triệu VND</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['POS', 'Shopee', 'TikTok Shop', 'MoMo'].map((source) => (
                    <span key={source} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            label="Hôm nay"
            title="47 giao dịch"
            value={formatCurrency(12450000)}
            detail="Dòng tiền đến từ POS, QR và marketplace"
            change="Tăng 12% so với hôm qua"
            icon={Wallet}
            accent="blue"
          />
          <StatsCard
            label="Tháng này"
            title="1.423 giao dịch"
            value={formatCurrency(385000000)}
            detail="Doanh thu đủ điều kiện mở hạn mức vốn lưu động"
            change="Tăng 8,5% so với tháng trước"
            icon={BarChart3}
            accent="amber"
          />
          <StatsCard
            label="Điểm tín dụng"
            title="745 / 850"
            value="Xếp hạng Tốt"
            detail="Mở giải thích minh bạch cho từng nhân tố"
            change="Tăng 15 điểm trong tháng này"
            icon={ShieldCheck}
            accent="emerald"
            onClick={() => setShowCreditScore(true)}
          />
          <StatsCard
            label="Cảnh báo rủi ro"
            title="02 sự kiện"
            value="Mức thấp"
            detail="1 đối soát trễ, 1 cụm đơn cần theo dõi"
            change="Không phát hiện ví quay vòng lớn"
            icon={ShieldAlert}
            accent="blue"
          />
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.75fr)_380px]">
          <div className="min-w-0">
            <RevenueChart data={revenueData} />
          </div>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-800 p-5 text-white shadow-[0_20px_45px_rgba(15,23,42,0.24)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-100">Sản phẩm vay phù hợp</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">Vay bổ sung vốn kinh doanh</h3>
                <p className="mt-3 text-sm leading-6 text-sky-100">
                  Hạn mức đề xuất 95.000.000 VND được tạo từ điểm 745, doanh thu ổn định và lịch sử settlement tốt.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/10">
                    <p className="text-sky-100">APR</p>
                    <p className="mt-1 text-lg font-semibold">15-18%</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/10">
                    <p className="text-sky-100">SLA</p>
                    <p className="mt-1 text-lg font-semibold">72h</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-3 py-3 ring-1 ring-white/10">
                    <p className="text-sky-100">Tài sản</p>
                    <p className="mt-1 text-lg font-semibold">Không cần</p>
                  </div>
                </div>
                <button
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-sky-800 transition hover:-translate-y-0.5 hover:bg-sky-50"
                  onClick={() => setShowLoanApplication(true)}
                >
                  Đăng ký vay vốn
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { icon: ChartNoAxesCombined, title: 'Báo cáo chi tiết', desc: 'Tổng hợp hiệu suất doanh thu theo từng kênh bán.' },
                  { icon: ClipboardList, title: 'Lịch sử giao dịch', desc: 'Theo dõi giao dịch mới nhất và trạng thái đối soát.' },
                  { icon: CreditCard, title: 'Đề xuất hạn mức', desc: 'Cập nhật hạn mức tự động theo dữ liệu 7 ngày mới nhất.' },
                ].map((action) => (
                  <button
                    key={action.title}
                    className="flex w-full items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-sky-200 hover:bg-sky-50"
                  >
                    <div className="rounded-2xl bg-white p-3 text-sky-700 shadow-sm">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{action.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">Fraud Lens</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Kiểm soát gian lận theo luồng tiền</h3>
                </div>
                <div className="rounded-2xl bg-rose-50 p-3 text-rose-500">
                  <ScanSearch className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-4">
                  <p className="text-sm font-semibold text-rose-800">Synthetic order cluster</p>
                  <p className="mt-1 text-sm text-rose-700">02 đơn hàng có giá trị lặp lại từ cùng 1 cụm tài khoản, hệ thống đang giảm trọng số scoring.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Circular wallet flows</p>
                  <p className="mt-1 text-sm text-slate-500">Không ghi nhận dòng tiền quay vòng bất thường trên ví MoMo trong 30 ngày gần nhất.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Velocity anomaly</p>
                  <p className="mt-1 text-sm text-slate-500">Tần suất giao dịch tăng 1,3x vào cuối tuần, phù hợp mẫu bán hàng theo khung giờ.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Hợp nhất dữ liệu</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Hợp nhất dữ liệu thành một profile có thể phê duyệt</h3>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                3 nguồn dữ liệu {'->'} 1 điểm {'->'} 1 đề xuất vay
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {sourceCards.map((card) => (
                <div key={card.title} className={`rounded-[26px] border border-slate-200 bg-gradient-to-br ${card.tone} p-5`}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Nguồn dữ liệu</p>
                  <h4 className="mt-3 text-xl font-semibold text-slate-900">{card.title}</h4>
                  <p className="mt-2 text-sm font-semibold text-sky-700">{card.value}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{card.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)]">
              <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                <div>
                  <p className="text-sm text-sky-100">Dữ liệu thực</p>
                  <p className="mt-2 text-xl font-semibold">POS + marketplace + e-wallet</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-sky-200 md:block" />
                <div>
                  <p className="text-sm text-sky-100">Điểm có thể giải thích</p>
                  <p className="mt-2 text-xl font-semibold">Revenue consistency, growth, cash health</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-sky-200 md:block" />
                <div>
                  <p className="text-sm text-sky-100">Đề xuất khoản vay</p>
                  <p className="mt-2 text-xl font-semibold">95M VND trong 72h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Onboarding 90 ngày</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Lộ trình từ merchant mới đến merchant được cấp vốn</h3>
              </div>
              <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                <CalendarClock className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {onboardingTimeline.map((item, index) => (
                <div key={item.day} className="flex gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-700 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    {index < onboardingTimeline.length - 1 ? <div className="mt-2 h-full w-px bg-slate-200" /> : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{item.day}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-emerald-600" />
                <p className="text-sm leading-6 text-emerald-900">
                  Sau 90 ngày, merchant có đủ dữ liệu để mở hạn mức động và nhận đề xuất tài trợ chu kỳ nhập hàng theo mùa.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <TransactionTable transactions={transactions} />
        </section>

        <section className="mt-8 grid gap-4 rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Với góc nhìn của ngân hàng</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Đây là giao diện để tin vào dữ liệu thay thế</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              Một màn hình duy nhất kết nối dòng tiền thực, giải thích score rõ ràng, hiện cảnh báo gian lận và chốt sản phẩm vay phù hợp cho SME.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            onClick={() => setShowLoanApplication(true)}
          >
            Xem demo hồ sơ vay
            <Landmark className="h-4 w-4" />
          </button>
        </section>
      </div>

      <CreditScoreModal
        open={showCreditScore}
        onClose={() => setShowCreditScore(false)}
        score={745}
        maxScore={850}
        change={15}
        breakdown={scoreBreakdown}
      />
      <LoanApplicationModal open={showLoanApplication} onClose={() => setShowLoanApplication(false)} />
    </div>
  )
}

export default Dashboard
