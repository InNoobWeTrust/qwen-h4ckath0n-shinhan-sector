import { CircleHelp, Landmark, ListChecks, Wallet } from 'lucide-react'
import ContextualCapitalCard from './ContextualCapitalCard'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function formatPercent(value) {
  return `${value.toLocaleString('vi-VN', { maximumFractionDigits: 0 })}%`
}

function CapitalSupportView({ capitalPackage, onOpenApplication, onOpenEligibilityDetails }) {
  const utilization = capitalPackage.availableLimit > 0 ? (capitalPackage.utilizedAmount / capitalPackage.availableLimit) * 100 : 0
  const remainingLimit = Math.max(capitalPackage.availableLimit - capitalPackage.utilizedAmount, 0)

  const contextualExamples = [
    {
      id: 'restock',
      headline: 'Cần nhập thêm hàng cho sản phẩm bán chạy?',
      description: 'Khi SKU bán nhanh xuống dưới ngưỡng an toàn, giải pháp vốn có thể giúp bổ sung lô hàng mà không cần làm xáo trộn kế hoạch chi trong ngày.',
      meta: 'Phù hợp khi cần xoay vòng tiền nhập hàng trong 3–10 ngày.',
    },
    {
      id: 'settlement',
      headline: 'Đối soát đang chậm, cần bổ sung vốn ngắn hạn?',
      description: 'Nếu tiền từ sàn hoặc ví điện tử về chậm hơn dự kiến, nguồn hỗ trợ ngắn hạn có thể giúp duy trì dòng tiền vận hành.',
      meta: 'Tập trung vào nhu cầu cầu nối dòng tiền, không phải quảng cáo vay chung chung.',
    },
  ]

  const faqItems = [
    {
      question: 'Hồ sơ được xem xét dựa trên gì?',
      answer: 'Dữ liệu vận hành như doanh thu, nhịp bán, lịch sử đối soát và chất lượng thanh toán được dùng để tham chiếu cho nhu cầu hỗ trợ.',
    },
    {
      question: 'Bao lâu thì có phản hồi?',
      answer: 'Quy trình mô phỏng hiện tại thể hiện thời gian tiếp nhận và đối chiếu trong vòng 72 giờ làm việc.',
    },
    {
      question: 'Có bắt buộc phải đăng ký khi thấy gợi ý không?',
      answer: 'Không. Gợi ý chỉ xuất hiện khi hệ thống nhận thấy một nhu cầu vận hành cụ thể, và merchant có thể bỏ qua bất cứ lúc nào.',
    },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 ring-1 ring-amber-100">
              <Wallet className="h-4 w-4" />
              Hỗ trợ vốn kinh doanh
            </div>
            <h2 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Hỗ trợ vốn kinh doanh
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Vốn là lớp hỗ trợ thứ cấp, chỉ cần thiết khi cửa hàng gặp nhu cầu vận hành cụ thể như nhập thêm hàng, bù khoảng đối soát hoặc xoay vòng dòng tiền ngắn hạn.
            </p>
          </div>

          <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)] lg:max-w-[340px]">
            <p className="text-sm text-amber-100">Trạng thái gói hiện tại</p>
            <p className="mt-2 text-2xl font-semibold">{capitalPackage.status === 'active' ? 'Đang hỗ trợ' : capitalPackage.status === 'pending' ? 'Đang đợi xử lý' : 'Chưa kích hoạt'}</p>
            <p className="mt-2 text-sm text-slate-300">Dữ liệu cập nhật lần cuối: {capitalPackage.lastUpdated}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Gói đang theo dõi</p>
            <p className="mt-3 text-xl font-semibold text-slate-900">{capitalPackage.packageType}</p>
            <p className="mt-2 text-sm text-slate-500">Kỳ hạn {capitalPackage.tenure}</p>
          </div>
            <div className="rounded-[28px] bg-emerald-50 p-5 ring-1 ring-emerald-100">
            <p className="text-sm text-emerald-700">Hạn mức có sẵn</p>
            <p className="mt-3 text-xl font-semibold text-emerald-900">{formatCurrency(capitalPackage.availableLimit)}</p>
            <p className="mt-2 text-sm text-emerald-800">Còn khả dụng {formatCurrency(remainingLimit)}</p>
          </div>
            <div className="rounded-[28px] bg-amber-50 p-5 ring-1 ring-amber-100">
            <p className="text-sm text-amber-700">Đã sử dụng</p>
            <p className="mt-3 text-xl font-semibold text-amber-900">{formatCurrency(capitalPackage.utilizedAmount)}</p>
            <p className="mt-2 text-sm text-amber-800">Tỷ lệ sử dụng {formatPercent(utilization)}</p>
          </div>
            <div className="rounded-[28px] bg-sky-50 p-5 ring-1 ring-sky-100">
            <p className="text-sm text-sky-700">Khung tham chiếu chi phí</p>
            <p className="mt-3 text-xl font-semibold text-sky-900">APR {capitalPackage.apr}</p>
            <p className="mt-2 text-sm text-sky-800">Thông tin chi tiết hiện trong lướng mô phỏng.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Điều kiện tham chiếu</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Đánh giá dựa trên hiệu quả kinh doanh</h3>
              </div>
            </div>
              <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">Doanh thu đều, nhịp bán ổn định và chu kỳ đối soát rõ ràng là các tín hiệu tích cực cho nhu cầu hỗ trợ.</div>
                <div className="rounded-2xl bg-slate-50 p-4">Lịch sử vận hành từ POS, sàn và ví điện tử được sử dụng để tham chiếu, không đóng vai trò như một thông điệp bán hàng ở màn hình chính.</div>
                <div className="rounded-2xl bg-slate-50 p-4">Nếu nhu cầu hiện tại không rõ ràng, tab này chỉ giữ vai trò tham khảo và theo dõi trạng thái.</div>
              </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenApplication({ source: 'capital-tab', context: 'tong-quat' })}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                Xem quy trình hỗ trợ
               </button>
              <button
                type="button"
                onClick={() => onOpenEligibilityDetails({ source: 'capital-tab', context: 'du-lieu-van-hanh' })}
                className="rounded-2xl bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-800 ring-1 ring-sky-100 transition hover:bg-sky-100"
                >
                Xem cơ sở đánh giá
               </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Vốn giúp gì cho cửa hàng</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Chỉ hiển thị khi gắn với một tình huống cụ thể</h3>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {contextualExamples.map((example) => (
                <ContextualCapitalCard
                  key={example.id}
                  headline={example.headline}
                  description={example.description}
                  meta={example.meta}
                  onViewSolution={() => onOpenApplication({ source: 'capital-tab', context: example.id })}
                  onViewDetails={() => onOpenEligibilityDetails({ source: 'capital-tab', context: example.id })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <CircleHelp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Quy trình hỗ trợ</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Mô phỏng đơn giản và trung thực</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-4">1. Hệ thống nhận diện nhu cầu vận hành như nhập hàng hoặc khoảng đối soát.</div>
                <div className="rounded-2xl bg-slate-50 p-4">2. Merchant xem giải pháp và thông tin tham chiếu từ dữ liệu kinh doanh hiện có.</div>
                <div className="rounded-2xl bg-slate-50 p-4">3. Nếu gửi yêu cầu, hồ sơ được tiếp nhận và đối chiếu trong vòng 72 giờ làm việc.</div>
                <div className="rounded-2xl bg-slate-50 p-4">4. Phản hồi cuối cùng vẫn phụ thuộc vào quy trình đánh giá thực tế.</div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-700">Câu hỏi thường gặp</p>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CapitalSupportView
