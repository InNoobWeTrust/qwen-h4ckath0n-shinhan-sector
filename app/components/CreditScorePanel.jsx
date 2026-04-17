import { AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react'
import { getBandColor } from '../src/lib/creditScoring'

const MAX_SCORE = 850

const palettes = {
  sky: {
    badge: 'bg-sky-100 text-sky-700',
    button: 'bg-sky-700 text-white hover:bg-sky-800',
    glow: 'from-sky-500/18 to-cyan-400/10',
    line: 'bg-sky-500',
    progress: 'bg-sky-500',
    ring: 'bg-sky-500/12 text-sky-700',
    soft: 'bg-sky-50 text-sky-800',
    text: 'text-sky-700',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-600 text-white hover:bg-emerald-700',
    glow: 'from-emerald-500/18 to-teal-400/10',
    line: 'bg-emerald-500',
    progress: 'bg-emerald-500',
    ring: 'bg-emerald-500/12 text-emerald-700',
    soft: 'bg-emerald-50 text-emerald-800',
    text: 'text-emerald-700',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700',
    button: 'bg-amber-500 text-white hover:bg-amber-600',
    glow: 'from-amber-500/18 to-orange-400/10',
    line: 'bg-amber-500',
    progress: 'bg-amber-500',
    ring: 'bg-amber-500/12 text-amber-700',
    soft: 'bg-amber-50 text-amber-800',
    text: 'text-amber-700',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-700',
    button: 'bg-orange-500 text-white hover:bg-orange-600',
    glow: 'from-orange-500/18 to-amber-400/10',
    line: 'bg-orange-500',
    progress: 'bg-orange-500',
    ring: 'bg-orange-500/12 text-orange-700',
    soft: 'bg-orange-50 text-orange-800',
    text: 'text-orange-700',
  },
  rose: {
    badge: 'bg-rose-100 text-rose-700',
    button: 'bg-rose-600 text-white hover:bg-rose-700',
    glow: 'from-rose-500/18 to-orange-300/10',
    line: 'bg-rose-500',
    progress: 'bg-rose-500',
    ring: 'bg-rose-500/12 text-rose-700',
    soft: 'bg-rose-50 text-rose-800',
    text: 'text-rose-700',
  },
  slate: {
    badge: 'bg-slate-100 text-slate-700',
    button: 'bg-slate-900 text-white hover:bg-slate-800',
    glow: 'from-slate-500/15 to-slate-300/10',
    line: 'bg-slate-500',
    progress: 'bg-slate-500',
    ring: 'bg-slate-500/12 text-slate-700',
    soft: 'bg-slate-100 text-slate-800',
    text: 'text-slate-700',
  },
}

function formatLimit(limit) {
  if (limit === 0) {
    return 'Không đủ điều kiện'
  }
  return `Đề xuất hạn mức: ${(limit / 1000000).toLocaleString('vi-VN')} triệu VND`
}

function CreditScorePanel({ scoreData, onOpenModal, onOpenLoan, selectedMerchantName }) {
  const { score = 0, band = 'Yếu nhiều', limit = 0, change = '', breakdown = [] } = scoreData ?? {}
  const progress = Math.max(0, Math.min(100, ((score - 300) / (850 - 300)) * 100))
  const eligibleForLoan = score >= 600 && limit > 0
  const palette = palettes[getBandColor(band)] ?? palettes.slate
  const limitText = formatLimit(limit)
  const merchantLabel = selectedMerchantName || 'Merchant đang chọn'
  const previewBreakdown = breakdown.slice(0, 3)

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.glow} opacity-0 transition duration-300 group-hover:opacity-100`} />
      <div className={`absolute left-0 top-6 h-16 w-1 rounded-r-full ${palette.line}`} />

      <div className="relative space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Xếp hạng tín nhiệm cửa hàng</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{merchantLabel}</h3>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              <Sparkles className="h-4 w-4 text-amber-500" />
              {change || 'Chưa có biến động gần đây'}
            </div>
          </div>

          <div className={`rounded-2xl p-3 ${palette.ring}`}>
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[24px] bg-slate-50/90 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-semibold tracking-tight text-slate-950">{score}</span>
              <span className="pb-1 text-lg font-medium text-slate-400">/850</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">Tổng hợp từ doanh thu, thanh toán và mức ổn định vận hành.</p>
          </div>

          <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${palette.badge}`}>{band}</span>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
            <span>Vị trí điểm (thang 300-850)</span>
            <span className={`font-semibold ${palette.text}`}>{progress.toFixed(0)}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-200">
            <div className={`h-3 rounded-full transition-all duration-700 ${palette.progress}`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-500">Khả năng tiếp cận vốn</p>
          <p className={`mt-2 text-lg font-semibold ${eligibleForLoan ? palette.text : 'text-rose-700'}`}>{limitText}</p>

          {eligibleForLoan ? (
            <div className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${palette.soft}`}>
              <ShieldCheck className="h-4 w-4" />
              Hồ sơ đang đủ điều kiện mở đăng ký vay
            </div>
          ) : (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700">
              <AlertTriangle className="h-4 w-4" />
              Không đủ điều kiện
            </div>
          )}
        </div>

        {previewBreakdown.length > 0 ? (
          <div className="grid gap-3">
            {previewBreakdown.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{item.label}</span>
                  <span className="font-semibold text-slate-900">{item.score}/100</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className={`h-2 rounded-full ${palette.progress}`} style={{ width: `${Math.max(0, Math.min(100, item.score))}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Xem chi tiết
          </button>

          {eligibleForLoan ? (
            <button
              type="button"
              onClick={onOpenLoan}
              className={`inline-flex flex-1 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${palette.button}`}
            >
              Đăng ký vay
            </button>
          ) : (
            <div className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-rose-50 px-5 py-3 text-sm font-semibold text-rose-700">
              <AlertTriangle className="h-4 w-4" />
              Không đủ điều kiện
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreditScorePanel
