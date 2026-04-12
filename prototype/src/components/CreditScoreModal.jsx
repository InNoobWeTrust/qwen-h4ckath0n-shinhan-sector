import { AlertTriangle, CircleX, ShieldCheck, Sparkles } from 'lucide-react'

function Gauge({ score, maxScore }) {
  const normalized = score / maxScore
  const radius = 120
  const circumference = Math.PI * radius
  const offset = circumference - circumference * normalized

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <svg viewBox="0 0 300 180" className="w-full drop-shadow-[0_20px_30px_rgba(2,132,199,0.15)]">
        <defs>
          <linearGradient id="creditGauge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
        <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round" />
        <path
          d="M 30 150 A 120 120 0 0 1 270 150"
          fill="none"
          stroke="url(#creditGauge)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <text x="150" y="112" textAnchor="middle" className="fill-slate-900 text-[40px] font-semibold">
          {score}
        </text>
        <text x="150" y="138" textAnchor="middle" className="fill-slate-500 text-sm">
          / {maxScore}
        </text>
      </svg>
    </div>
  )
}

function CreditScoreModal({ open, onClose, score, maxScore, change, breakdown }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.28)] animate-[fadeUp_.28s_ease-out]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Chi tiết xếp hạng</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Điểm tín dụng doanh nghiệp có thể giải thích</h2>
          </div>
          <button className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose}>
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-5 rounded-[28px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6">
            <Gauge score={score} maxScore={maxScore} />
            <div className="text-center">
              <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Xếp hạng Tốt</span>
              <p className="mt-3 text-sm leading-6 text-slate-500">Merchant đủ điều kiện nhận hạn mức vay quay vòng với cảnh báo rủi ro mức thấp.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Tăng điểm</p>
                <p className="mt-2 text-xl font-semibold text-emerald-700">+{change}</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Approval odds</p>
                <p className="mt-2 text-xl font-semibold text-sky-700">87%</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Fraud status</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">Thấp</p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-amber-500" />
                <p>
                  Điểm đã tăng <strong>{change} điểm</strong> trong tháng này nhờ doanh thu ổn định, tỷ lệ hoàn trả cao và lịch sử thanh toán tốt hơn.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="font-semibold">Yếu tố kéo điểm lên</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">Revenue consistency mạnh, settlement on-time và return rate thấp giúp score giữ vững ở nhóm tốt.</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white/90 p-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-semibold">Yếu tố cần theo dõi</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">Có 1 cụm đơn hàng giá trị lặp lại cần tiếp tục đối chiếu để tránh làm giảm hạn mức được mở.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Phân tích chi tiết</h3>
            <div className="mt-4 space-y-4">
              {breakdown.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4 text-sm font-medium text-slate-700">
                    <span>{item.label}</span>
                    <span className="font-semibold text-slate-900">{item.score}/100</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${item.score >= 85 ? 'bg-emerald-500' : item.score >= 75 ? 'bg-sky-600' : 'bg-amber-500'}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">Góc nhìn của ngân hàng</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Merchant này không cần dựa vào tài sản đảm bảo. Bằng chứng quan trọng nhất là dòng doanh thu có thật, nhiều kênh, và lịch sử settlement được theo dõi liên tục.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditScoreModal
