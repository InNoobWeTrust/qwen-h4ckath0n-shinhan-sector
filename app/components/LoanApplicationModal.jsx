import { useMemo, useState } from 'react'
import { BadgeCheck, CircleX, Landmark, ShieldCheck, Sparkles } from 'lucide-react'
import StepIndicator from './StepIndicator'

const steps = [{ label: 'Số tiền' }, { label: 'Kỳ hạn' }, { label: 'Xem lại' }, { label: 'Xác nhận' }]

const termOptions = [
  { months: 3, apr: 0.15 },
  { months: 6, apr: 0.16 },
  { months: 9, apr: 0.17 },
  { months: 12, apr: 0.18 },
]

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function LoanApplicationModal({ open, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [amount, setAmount] = useState(95000000)
  const [termMonths, setTermMonths] = useState(6)
  const [requestId, setRequestId] = useState('')

  const selectedTerm = termOptions.find((option) => option.months === termMonths) ?? termOptions[1]

  const loanSummary = useMemo(() => {
    const monthlyRate = selectedTerm.apr / 12
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, selectedTerm.months)) /
      (Math.pow(1 + monthlyRate, selectedTerm.months) - 1)
    const totalPayment = monthlyPayment * selectedTerm.months
    const totalInterest = totalPayment - amount

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    }
  }, [amount, selectedTerm])

  if (!open) return null

  const resetForm = () => {
    setCurrentStep(1)
    setAmount(95000000)
    setTermMonths(6)
    setRequestId('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = () => {
    setRequestId(`SCC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
    setCurrentStep(4)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={handleClose}>
      <div
        className="animate-[fadeUp_.28s_ease-out] max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Giải pháp vốn nhập hàng</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Thiết lập nhu cầu vốn lưu động Shinhan</h2>
          </div>
          <button className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={handleClose}>
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
          <div>
            <StepIndicator currentStep={currentStep} steps={steps} />

            <div className="mt-8">
              {currentStep === 1 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Chọn số tiền cần bổ sung</h3>
                    <p className="mt-2 text-sm text-slate-500">Mức tham khảo được gợi ý từ doanh thu tại quầy, đơn đa kênh và nhu cầu nhập hàng ngắn hạn.</p>
                  </div>
                  <div className="rounded-[28px] bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-500">Nhu cầu vốn tham khảo</p>
                      <p className="mt-3 text-4xl font-semibold tracking-tight text-sky-700">{formatCurrency(amount)}</p>
                      <p className="mt-2 text-sm text-slate-500">Ưu tiên dùng cho nhập hàng nhanh và xoay vòng trong ca</p>
                    </div>
                    <input
                      type="range"
                      min={5000000}
                      max={120000000}
                      step={5000000}
                      value={amount}
                      onChange={(event) => setAmount(Number(event.target.value))}
                      className="mt-8 h-2 w-full cursor-pointer appearance-none rounded-full bg-sky-100 accent-sky-700"
                    />
                    <div className="mt-3 flex justify-between text-sm text-slate-500">
                      <span>5 triệu</span>
                      <span>120 triệu</span>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Phản hồi hồ sơ</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Trong 72 giờ</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tài sản đảm bảo</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">Không cần</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Nguồn dữ liệu vận hành</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">3 nguồn đang đồng bộ</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800" onClick={() => setCurrentStep(2)}>
                      Tiếp theo
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 2 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Chọn kỳ hạn phù hợp</h3>
                    <p className="mt-2 text-sm text-slate-500">Kỳ hạn được chọn theo chu kỳ nhập hàng và tốc độ bán ra của cửa hàng.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {termOptions.map((option) => {
                      const active = option.months === termMonths
                      return (
                        <button
                          key={option.months}
                          type="button"
                          onClick={() => setTermMonths(option.months)}
                          className={`rounded-[24px] border p-5 text-left transition ${
                            active
                              ? 'border-sky-700 bg-sky-50 shadow-[0_18px_40px_rgba(2,132,199,0.16)]'
                              : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className={`text-2xl font-semibold ${active ? 'text-sky-700' : 'text-slate-900'}`}>{option.months} tháng</p>
                              <p className="mt-2 text-sm text-slate-500">Phù hợp cho chu kỳ hàng nhanh của cửa hàng tiện lợi</p>
                            </div>
                            <Landmark className={`h-6 w-6 ${active ? 'text-sky-700' : 'text-slate-400'}`} />
                          </div>
                          <div className="mt-5 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                            APR {(option.apr * 100).toFixed(0)}%
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100" onClick={() => setCurrentStep(1)}>
                      Quay lại
                    </button>
                    <button className="rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800" onClick={() => setCurrentStep(3)}>
                      Tiếp theo
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 3 ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Xem lại thông tin</h3>
                    <p className="mt-2 text-sm text-slate-500">Tất cả giá trị dưới đây là mô phỏng theo dữ liệu vận hành hiện tại của cửa hàng.</p>
                  </div>
                  <div className="rounded-[28px] bg-slate-50 p-6">
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <p className="text-sm text-slate-500">Số tiền tham khảo</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(amount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Kỳ hạn</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900">{termMonths} tháng</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">APR</p>
                        <p className="mt-2 text-2xl font-semibold text-emerald-700">{(selectedTerm.apr * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Trả hàng tháng</p>
                        <p className="mt-2 text-2xl font-semibold text-sky-700">{formatCurrency(Math.round(loanSummary.monthlyPayment))}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Tổng thanh toán</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(Math.round(loanSummary.totalPayment))}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Tổng chi phí lãi</p>
                        <p className="mt-2 text-lg font-semibold text-amber-600">{formatCurrency(Math.round(loanSummary.totalInterest))}</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    Hồ sơ sẽ được phản hồi trong vòng 72 giờ làm việc sau khi Shinhan hoàn tất đối chiếu thông tin vận hành.
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100" onClick={() => setCurrentStep(2)}>
                      Quay lại
                    </button>
                    <button className="rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800" onClick={handleSubmit}>
                      Gửi yêu cầu
                    </button>
                  </div>
                </div>
              ) : null}

              {currentStep === 4 ? (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                    <BadgeCheck className="h-14 w-14 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight text-slate-900">Yêu cầu đã được ghi nhận</h3>
                    <p className="mt-3 text-slate-500">Shinhan Credit Connect đang kiểm tra hồ sơ và sẽ gửi phản hồi sau khi hoàn tất đối chiếu dữ liệu vận hành.</p>
                  </div>
                  <div className="rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">Mã yêu cầu</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{requestId}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">Trạng thái</p>
                        <p className="mt-2 text-lg font-semibold text-emerald-700">Đang tiếp nhận</p>
                      </div>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">Bước tiếp theo</p>
                        <p className="mt-2 text-lg font-semibold text-sky-700">Liên hệ xác nhận trong 72 giờ</p>
                      </div>
                    </div>
                  </div>
                  <button className="mx-auto rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800" onClick={handleClose}>
                    Hoàn thành
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-100">Tóm tắt hồ sơ vận hành</p>
            <div className="mt-4 rounded-[24px] bg-white/8 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-300">Mức tham khảo hiện tại</p>
              <p className="mt-2 text-3xl font-semibold">95M VND</p>
              <p className="mt-2 text-sm text-slate-300">Cửa hàng đang thuộc nhóm có doanh thu và chu kỳ đối soát ổn định trong phân khúc bán lẻ nhỏ.</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-emerald-200">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="font-semibold">Dữ liệu đã xác thực</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">POS, Shopee, TikTok Shop và MoMo đã được đối chiếu trong 90 ngày gần nhất.</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-sky-200">
                  <Landmark className="h-5 w-5" />
                  <p className="font-semibold">Điều kiện sản phẩm</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">Gói vốn không thế chấp, APR 15-18%/năm, phản hồi hồ sơ trong 72 giờ.</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-amber-200">
                  <Sparkles className="h-5 w-5" />
                  <p className="font-semibold">Điểm vận hành nổi bật</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">Doanh thu đều, lịch sử thanh toán tốt và mức an toàn thanh toán thấp đang hỗ trợ hồ sơ hiện tại.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default LoanApplicationModal
