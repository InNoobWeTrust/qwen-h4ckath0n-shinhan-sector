function SettlementStatusPill({ status }) {
  const config = {
    settled: {
      label: 'Đã đối soát',
      tone: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    },
    pending: {
      label: 'Đang chờ',
      tone: 'bg-amber-100 text-amber-700 ring-amber-200',
    },
    delayed: {
      label: 'Trễ',
      tone: 'bg-red-100 text-red-700 ring-red-200',
    },
  }

  const current = config[status] ?? {
    label: 'Đang chờ',
    tone: 'bg-slate-100 text-slate-700 ring-slate-200',
  }

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${current.tone}`}>{current.label}</span>
}

export default SettlementStatusPill
