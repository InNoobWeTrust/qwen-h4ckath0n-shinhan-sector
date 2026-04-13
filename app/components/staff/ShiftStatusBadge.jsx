function ShiftStatusBadge({ status, className = '' }) {
  const styles = {
    on: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    off: 'bg-slate-200 text-slate-600 ring-slate-300',
    late: 'bg-red-100 text-red-700 ring-red-200',
  }

  const labels = {
    on: 'Đang ca',
    off: 'Đã off',
    late: 'Trễ ca',
  }

  const tone = styles[status] ?? styles.off
  const label = labels[status] ?? labels.off

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${tone} ${className}`.trim()}>
      <span className={`h-2.5 w-2.5 rounded-full ${status === 'on' ? 'bg-emerald-500 animate-pulse' : status === 'late' ? 'bg-red-500' : 'bg-slate-400'}`} />
      {label}
    </span>
  )
}

export default ShiftStatusBadge
