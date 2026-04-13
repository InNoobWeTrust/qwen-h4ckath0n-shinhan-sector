import { ArrowRight, CircleHelp, X } from 'lucide-react'

function ContextualCapitalCard({
  eyebrow = 'Hỗ trợ vốn theo ngữ cảnh',
  headline,
  description,
  meta,
  onViewSolution,
  onViewDetails,
  onDismiss,
}) {
  return (
    <div className="rounded-[24px] border border-amber-200 bg-[linear-gradient(135deg,rgba(255,251,235,0.96)_0%,rgba(254,243,199,0.82)_100%)] p-4 text-left shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>
          <h4 className="mt-2 text-base font-semibold text-slate-900">{headline}</h4>
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-white/80 hover:text-slate-700"
            aria-label="Ẩn gợi ý vốn"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {meta ? <div className="mt-3 rounded-2xl bg-white/80 px-3 py-2 text-xs font-medium text-slate-600 ring-1 ring-white/80">{meta}</div> : null}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onViewSolution}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          Xem giải pháp
          <ArrowRight className="h-4 w-4" />
        </button>
        {onViewDetails ? (
            <button
              type="button"
              onClick={onViewDetails}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-white"
            >
              Cơ sở đánh giá
              <CircleHelp className="h-4 w-4" />
            </button>
        ) : null}
        {onDismiss ? (
            <button
              type="button"
              onClick={onDismiss}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
            Không cần lúc này
            </button>
        ) : null}
      </div>
    </div>
  )
}

export default ContextualCapitalCard
