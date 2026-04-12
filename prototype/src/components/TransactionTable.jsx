function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

const statusStyles = {
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/10',
}

const statusLabels = {
  completed: 'Hoàn thành',
  pending: 'Đang xử lý',
}

const healthStyles = {
  stable: 'bg-sky-50 text-sky-700',
  growth: 'bg-indigo-50 text-indigo-700',
  review: 'bg-rose-50 text-rose-700',
}

const healthLabels = {
  stable: 'Dòng tiền ổn định',
  growth: 'Kênh tăng trưởng',
  review: 'Cần đối soát',
}

function TransactionTable({ transactions }) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Dòng giao dịch</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Giao dịch gần đây và dấu vết scoring</h3>
          <p className="mt-2 text-sm text-slate-500">Mỗi giao dịch đều được gắn kênh dữ liệu, trạng thái đối soát và mức tác động đến score.</p>
        </div>
        <button className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-100">
          Xem tất cả
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:hidden">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{transaction.id}</p>
                <p className="mt-1 text-sm text-slate-500">{transaction.time} • {transaction.channel}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[transaction.status]}`}>
                {statusLabels[transaction.status]}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{transaction.description}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-base font-semibold text-slate-900">{formatCurrency(transaction.amount)}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${healthStyles[transaction.health]}`}>
                {healthLabels[transaction.health]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <th className="px-4">Mã GD</th>
              <th className="px-4">Kênh</th>
              <th className="px-4">Mô tả</th>
              <th className="px-4">Tín hiệu</th>
              <th className="px-4 text-right">Số tiền</th>
              <th className="px-4 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="rounded-2xl bg-slate-50 text-sm text-slate-600 transition hover:bg-slate-100/90">
                <td className="rounded-l-2xl px-4 py-4">
                  <p className="font-semibold text-slate-900">{transaction.id}</p>
                  <p className="mt-1 text-xs text-slate-500">{transaction.time}</p>
                </td>
                <td className="px-4 py-4 font-medium text-slate-700">{transaction.channel}</td>
                <td className="px-4 py-4">{transaction.description}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${healthStyles[transaction.health]}`}>
                    {healthLabels[transaction.health]}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-semibold text-slate-900">{formatCurrency(transaction.amount)}</td>
                <td className="rounded-r-2xl px-4 py-4 text-center">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[transaction.status]}`}>
                    {statusLabels[transaction.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionTable
