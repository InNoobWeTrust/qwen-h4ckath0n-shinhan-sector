import { Fragment } from 'react'
import { ChevronDown, ChevronUp, ArrowDownWideNarrow } from 'lucide-react'
import ShiftStatusBadge from './ShiftStatusBadge'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function formatShortCurrency(amount) {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} tr`
  }

  return formatCurrency(amount)
}

function getBreakdown(staff) {
  return {
    dailySales: Math.max(0, Math.round(staff.salesCount * 0.58)),
    dailyRevenue: Math.max(0, Math.round(staff.salesAmount * 0.54)),
    weeklySales: staff.salesCount * 6,
    weeklyRevenue: staff.salesAmount * 5,
  }
}

function StaffPerformanceTable({ staff = [], sortBy = 'salesAmount', sortDirection = 'desc', onSortChange, expandedStaffId, onToggleExpand }) {
  const sortLabel = sortBy === 'salesAmount' ? 'doanh thu' : sortBy === 'salesCount' ? 'số đơn' : 'giỏ trung bình'

  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Hiệu suất theo nhân sự</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">So sánh đóng góp trong ngày</h3>
        </div>
        <button
          type="button"
          onClick={onSortChange}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
        >
          <ArrowDownWideNarrow className="h-4 w-4" />
          Sắp theo {sortLabel} {sortDirection === 'desc' ? 'giảm dần' : 'tăng dần'}
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <th className="px-4">Tên</th>
              <th className="px-4">Vai trò</th>
              <th className="px-4">Ca làm việc</th>
              <th className="px-4">Bán hôm nay</th>
              <th className="px-4">Doanh thu</th>
              <th className="px-4">Giỏ trung bình</th>
              <th className="px-4 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => {
              const expanded = expandedStaffId === member.staffId
              const breakdown = getBreakdown(member)

              return (
                <Fragment key={member.staffId}>
                  <tr
                    onClick={() => onToggleExpand(member.staffId)}
                    className="cursor-pointer rounded-[24px] bg-slate-50 text-sm text-slate-600 transition hover:bg-sky-50/70"
                  >
                    <td className="rounded-l-[24px] px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-3 w-3 rounded-full ${member.shiftStatus === 'on' ? 'bg-emerald-500' : member.shiftStatus === 'late' ? 'bg-red-500' : 'bg-slate-400'}`} />
                        <div>
                          <p className="font-semibold text-slate-900">{member.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{member.staffId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{member.role}</td>
                    <td className="px-4 py-4">
                      <div className="space-y-2">
                        <p className="font-medium text-slate-700">Bắt đầu {member.shiftStart}</p>
                        <ShiftStatusBadge status={member.shiftStatus} />
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{member.salesCount} đơn</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{formatShortCurrency(member.salesAmount)}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{formatShortCurrency(member.averageBasket)}</td>
                    <td className="rounded-r-[24px] px-4 py-4 text-right">
                      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        {expanded ? 'Thu gọn' : 'Xem'}
                      </span>
                    </td>
                  </tr>
                  {expanded ? (
                    <tr>
                      <td colSpan="7" className="px-2 pb-2">
                        <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
                          <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                              <p className="text-xs uppercase tracking-[0.18em] text-sky-100">Trong ngày</p>
                              <p className="mt-3 text-lg font-semibold">{breakdown.dailySales} đơn</p>
                              <p className="mt-1 text-sm text-slate-200">Doanh thu {formatCurrency(breakdown.dailyRevenue)}</p>
                            </div>
                            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                              <p className="text-xs uppercase tracking-[0.18em] text-sky-100">7 ngày gần nhất</p>
                              <p className="mt-3 text-lg font-semibold">{breakdown.weeklySales} đơn</p>
                              <p className="mt-1 text-sm text-slate-200">Doanh thu {formatCurrency(breakdown.weeklyRevenue)}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffPerformanceTable
