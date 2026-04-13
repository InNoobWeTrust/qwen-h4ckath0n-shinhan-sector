import { TrendingUp } from 'lucide-react'

function StatsCard({
  label,
  title,
  value,
  detail,
  change,
  icon,
  accent = 'blue',
  onClick,
}) {
  const accents = {
    blue: {
      border: 'border-sky-500/70',
      ring: 'bg-sky-500/12 text-sky-700',
      value: 'text-sky-700',
      glow: 'from-sky-500/18 to-cyan-400/10',
    },
    emerald: {
      border: 'border-emerald-500/70',
      ring: 'bg-emerald-500/12 text-emerald-700',
      value: 'text-emerald-700',
      glow: 'from-emerald-500/18 to-teal-400/10',
    },
    amber: {
      border: 'border-amber-500/70',
      ring: 'bg-amber-500/12 text-amber-700',
      value: 'text-amber-700',
      glow: 'from-amber-500/18 to-orange-400/10',
    },
  }

  const palette = accents[accent] ?? accents.blue
  const IconComponent = icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-6 text-left shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(14,116,144,0.18)] ${onClick ? 'cursor-pointer' : 'cursor-default'} `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.glow} opacity-0 transition duration-300 group-hover:opacity-100`} />
      <div className={`absolute left-0 top-6 h-16 w-1 rounded-r-full ${palette.border.replace('border-', 'bg-')}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{title}</p>
          <p className={`mt-2 text-xl font-semibold ${palette.value}`}>{value}</p>
          {detail ? <p className="mt-2 text-sm text-slate-500">{detail}</p> : null}
        </div>
        <div className={`rounded-2xl p-3 ${palette.ring}`}>
          <IconComponent className="h-6 w-6" />
        </div>
      </div>
      <div className="relative mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600">
        <TrendingUp className="h-4 w-4" />
        <span>{change}</span>
      </div>
    </button>
  )
}

export default StatsCard
