import { AlertTriangle, CircleX, ShieldCheck, Sparkles } from 'lucide-react'
import { getBandColor } from '../src/lib/creditScoring'

const BASE_SCORE = 300
const MAX_SCORE = 850
const SCORE_MULTIPLIER = 8.5

const bandBadgeClasses = {
  sky: 'bg-sky-100 text-sky-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  orange: 'bg-orange-100 text-orange-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-700',
}

const waterfallSegments = [
  {
    key: 'revenue',
    label: 'Doanh thu',
    weight: 0.35,
    barClass: 'bg-sky-500',
    softClass: 'bg-sky-50 text-sky-700',
    textClass: 'text-sky-700',
  },
  {
    key: 'stability',
    label: 'Ổn định',
    weight: 0.25,
    barClass: 'bg-emerald-500',
    softClass: 'bg-emerald-50 text-emerald-700',
    textClass: 'text-emerald-700',
  },
  {
    key: 'payment',
    label: 'Thanh toán',
    weight: 0.25,
    barClass: 'bg-amber-500',
    softClass: 'bg-amber-50 text-amber-700',
    textClass: 'text-amber-700',
  },
  {
    key: 'diversity',
    label: 'Đa dạng',
    weight: 0.15,
    barClass: 'bg-indigo-500',
    softClass: 'bg-indigo-50 text-indigo-700',
    textClass: 'text-indigo-700',
  },
]

function getSafetyLabel(band) {
  switch (band) {
    case 'Tốt':
      return 'Mức thấp'
    case 'Khá':
      return 'Mức thấp'
    case 'Trung bình':
      return 'Mức trung bình'
    case 'Yếu':
      return 'Mức cao'
    case 'Yếu nhiều':
      return 'Mức rất cao'
    default:
      return 'Mức trung bình'
  }
}

function getPercent(value, max = MAX_SCORE) {
  return Math.max(0, Math.min(100, (value / max) * 100))
}

function getContribution(value, weight) {
  return Number(value ?? 0) * weight * SCORE_MULTIPLIER
}

function getWaterfallData(scores) {
  let runningTotal = BASE_SCORE

  return waterfallSegments.map((segment) => {
    const contribution = getContribution(scores?.[segment.key], segment.weight)
    const start = runningTotal
    const end = start + contribution

    runningTotal = end

    return {
      ...segment,
      contribution,
      start,
      end,
    }
  })
}

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

function WaterfallChart({ scores, score, breakdown }) {
  const hasScores = waterfallSegments.some((segment) => Number.isFinite(Number(scores?.[segment.key])))
  const rows = hasScores ? getWaterfallData(scores) : []
  const computedTotal = rows.at(-1)?.end ?? BASE_SCORE
  const totalScore = hasScores ? Math.round(computedTotal) : Math.max(BASE_SCORE, Math.round(Number(score) || BASE_SCORE))

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Điểm thành phần</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">Công thức: (revenue x 0,35 + stability x 0,25 + payment x 0,25 + diversity x 0,15) x 8,5 + 300</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{totalScore}/850</div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
          <div className="text-right text-sm font-semibold text-slate-500">300</div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">Base</span>
              <span className="font-semibold text-slate-900">Mốc nền 300</span>
            </div>
            <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
              <div className="absolute inset-y-0 left-0 rounded-full bg-slate-900" style={{ width: `${getPercent(BASE_SCORE)}%` }} />
            </div>
          </div>
        </div>

        {hasScores ? (
          rows.map((item) => (
            <div key={item.key} className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
              <div className="text-right text-xs font-semibold text-slate-400">{Math.round(item.start)}</div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${item.softClass}`}>{item.label}</span>
                  <span className={`font-semibold ${item.textClass}`}>+{Math.round(item.contribution)} điểm</span>
                </div>
                <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-slate-200" style={{ width: `${getPercent(item.start)}%` }} />
                  <div
                    className={`absolute inset-y-0 rounded-full ${item.barClass}`}
                    style={{ left: `${getPercent(item.start)}%`, width: `${getPercent(item.contribution)}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm leading-6 text-slate-500">
            Chưa có đủ dữ liệu thành phần để hiển thị waterfall chart cho hồ sơ này.
          </div>
        )}

        <div className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-3">
          <div className="text-right text-sm font-semibold text-slate-900">{totalScore}</div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-900">Tổng điểm</span>
              <span className="font-semibold text-slate-900">{totalScore}/850</span>
            </div>
            <div className="relative h-5 overflow-hidden rounded-full bg-slate-100">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-900 via-sky-700 to-emerald-500" style={{ width: `${getPercent(totalScore)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {Array.isArray(breakdown) && breakdown.length > 0 ? (
        <p className="mt-4 text-xs leading-5 text-slate-400">Phần waterfall này tổng hợp từ 4 trụ cột chấm điểm chính và {breakdown.length} tín hiệu diễn giải chi tiết trong hồ sơ.</p>
      ) : null}
    </div>
  )
}

function CreditScoreModal({ open, onClose, score, maxScore, change, breakdown, scores, positiveFactors, negativeFactors, whatIf, band }) {
  if (!open) return null

  const bandColor = getBandColor(band)
  const bandBadgeClassName = bandBadgeClasses[bandColor] ?? bandBadgeClasses.slate
  const monthlyChange =
    typeof change === 'number'
      ? `${change > 0 ? '+' : ''}${change}`
      : String(change ?? '').match(/[+-]?\d+(?:[.,]\d+)?/)?.[0] ?? String(change ?? '').trim()
  const isPositiveChange = !monthlyChange.startsWith('-')
  const monthlyChangeValue = Number.parseFloat(monthlyChange.replace(',', '.'))
  const monthlyChangeDisplay = Number.isFinite(monthlyChangeValue)
    ? String(Math.abs(monthlyChangeValue)).replace('.', ',')
    : monthlyChange.replace(/^[+-]/, '')
  const safetyLabel = getSafetyLabel(band)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="animate-[fadeUp_.28s_ease-out] max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Chi tiết hỗ trợ vốn</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Dữ liệu vận hành làm cơ sở cho đề xuất hiện tại</h2>
          </div>
          <button className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose}>
            <CircleX className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <div className="space-y-5 rounded-[28px] bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6">
            <Gauge score={score} maxScore={maxScore} />
            <div className="text-center">
              <span className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${bandBadgeClassName}`}>{band}</span>
              <p className="mt-3 text-sm leading-6 text-slate-500">Doanh thu, đối soát và lịch sử thanh toán đang ở mức phù hợp để tham chiếu cho giải pháp vốn lưu động.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Biến động tháng</p>
                <p className={`mt-2 text-xl font-semibold ${isPositiveChange ? 'text-emerald-700' : 'text-rose-700'}`}>{monthlyChange}</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Ổn định vận hành</p>
                <p className="mt-2 text-xl font-semibold text-sky-700">{band}</p>
              </div>
              <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">An toàn thanh toán</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{safetyLabel}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-amber-500" />
                {isPositiveChange ? (
                  <p>
                    Chỉ số tổng hợp tăng <strong>{monthlyChangeDisplay} điểm</strong> trong tháng này nhờ doanh thu ổn định hơn, tỷ lệ đối soát đúng hạn cao và chu kỳ dòng tiền đều.
                  </p>
                ) : (
                  <p>
                    Chỉ số tổng hợp giảm <strong>{monthlyChangeDisplay} điểm</strong> trong tháng này. Cần theo dõi biến động doanh thu và cải thiện tỷ lệ đối soát.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-white/90 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="font-semibold">Yếu tố đang hỗ trợ tốt</p>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-500">
                  {(positiveFactors ?? []).map((item) => (
                    <li key={item.code}>{item.text}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-white/90 p-4">
                <div className="flex items-center gap-2 text-rose-700">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-semibold">Điểm cần theo dõi</p>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-500">
                  {(negativeFactors ?? []).map((item) => (
                    <li key={item.code}>{item.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">Phân tích chi tiết</h3>
            <div className="mt-4 space-y-4">
              {(breakdown ?? []).map((item) => (
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

            {whatIf ? (
              <div className="mt-5 rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-amber-950">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Nếu cải thiện thêm</p>
                <p className="mt-3 text-sm leading-7">{whatIf.condition}</p>
                <p className="mt-2 text-sm font-semibold">{whatIf.improvement}</p>
              </div>
            ) : null}

            <div className="mt-5">
              <WaterfallChart scores={scores} score={score} breakdown={breakdown} />
            </div>

            <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-950 p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-100">Cơ sở tham chiếu</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Đề xuất hiện tại bám theo dữ liệu doanh thu, nhịp bán hàng, lịch sử đối soát và chất lượng thanh toán đã được theo dõi liên tục từ nhiều kênh bán.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditScoreModal
