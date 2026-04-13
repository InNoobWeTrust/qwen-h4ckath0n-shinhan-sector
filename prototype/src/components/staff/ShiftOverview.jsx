import { useMemo, useState } from 'react'
import { Clock3, Plus, Users } from 'lucide-react'
import { staffMembers } from '../../data/mockData'
import OnShiftList from './OnShiftList'
import StaffPerformanceTable from './StaffPerformanceTable'

function ShiftOverview() {
  const [sortState, setSortState] = useState({ key: 'salesAmount', direction: 'desc' })
  const [expandedStaffId, setExpandedStaffId] = useState(staffMembers[0]?.staffId ?? null)

  const summary = useMemo(() => {
    const onShift = staffMembers.filter((member) => member.shiftStatus === 'on').length
    const offShift = staffMembers.filter((member) => member.shiftStatus === 'off').length

    return {
      onShift,
      offShift,
      total: staffMembers.length,
    }
  }, [])

  const onShiftMembers = useMemo(() => staffMembers.filter((member) => member.shiftStatus === 'on'), [])

  const sortedStaff = useMemo(() => {
    const ordered = [...staffMembers].sort((left, right) => {
      const delta = right[sortState.key] - left[sortState.key]
      return sortState.direction === 'desc' ? delta : -delta
    })

    return ordered
  }, [sortState])

  const handleSortChange = () => {
    setSortState((current) => {
      if (current.key === 'salesAmount' && current.direction === 'desc') {
        return { key: 'salesCount', direction: 'desc' }
      }

      if (current.key === 'salesCount' && current.direction === 'desc') {
        return { key: 'averageBasket', direction: 'desc' }
      }

      if (current.key === 'averageBasket' && current.direction === 'desc') {
        return { key: 'salesAmount', direction: 'asc' }
      }

      return { key: 'salesAmount', direction: 'desc' }
    })
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[36px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100">
              <Users className="h-4 w-4" />
              Nhân viên
            </div>
            <h2 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Theo dõi ca làm và hiệu suất bán hàng
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
              Nắm nhanh ai đang đứng quầy, ai đã off và đóng góp doanh thu theo từng nhân viên trong ngày.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900">
            Thêm nhân viên
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.16)]">
              <p className="text-sm text-sky-100">Nhân viên đang ca</p>
              <p className="mt-3 text-3xl font-semibold">{summary.onShift}</p>
            </div>
            <div className="rounded-[28px] bg-slate-100 p-5 ring-1 ring-slate-200">
              <p className="text-sm text-slate-600">Đang nghỉ</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{summary.offShift}</p>
            </div>
            <div className="rounded-[28px] bg-emerald-50 p-5 ring-1 ring-emerald-100">
              <p className="text-sm text-emerald-700">Tổng số</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-900">{summary.total}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[28px] border border-sky-100 bg-sky-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-700">Ca hiện tại</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Ca sáng 06:00 - 14:00</p>
              <p className="mt-2 text-sm text-slate-600">2 người đã check-in, 1 quản lý trễ ca cần theo dõi.</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Lịch sử ca</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">7 ngày gần nhất</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-600">
                <Clock3 className="h-4 w-4 text-sky-700" />
                Theo dõi trễ ca, off ca và năng suất theo ngày.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnShiftList staff={onShiftMembers} />

      <StaffPerformanceTable
        staff={sortedStaff}
        sortBy={sortState.key}
        sortDirection={sortState.direction}
        onSortChange={handleSortChange}
        expandedStaffId={expandedStaffId}
        onToggleExpand={(staffId) => setExpandedStaffId((current) => (current === staffId ? null : staffId))}
      />
    </div>
  )
}

export default ShiftOverview
