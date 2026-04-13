import { Clock3, ShoppingBag, Wallet } from 'lucide-react'
import ShiftStatusBadge from './ShiftStatusBadge'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(-2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function OnShiftList({ staff = [] }) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">Ca hiện tại</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Nhân viên đang làm việc</h3>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{staff.length} người</div>
      </div>

      <div className="mt-6 space-y-4">
        {staff.map((member) => (
          <div key={member.staffId} className="rounded-[26px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(14,165,233,0.16)_0%,rgba(16,185,129,0.14)_100%)] font-semibold text-sky-800 ring-1 ring-sky-100">
                  {getInitials(member.name)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-lg font-semibold text-slate-900">{member.name}</p>
                    <ShiftStatusBadge status="on" />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{member.role}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">
                      <Clock3 className="h-3.5 w-3.5" />
                      Bắt đầu ca {member.shiftStart}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-200">
                      <ShoppingBag className="h-3.5 w-3.5" />
                      {member.salesCount} đơn trong ca
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Doanh thu ca</p>
                  <p className="mt-2 font-semibold text-slate-900">{formatCurrency(member.salesAmount)}</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Giỏ trung bình</p>
                  <p className="mt-2 inline-flex items-center gap-2 font-semibold text-slate-900">
                    <Wallet className="h-4 w-4 text-sky-700" />
                    {formatCurrency(member.averageBasket)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnShiftList
