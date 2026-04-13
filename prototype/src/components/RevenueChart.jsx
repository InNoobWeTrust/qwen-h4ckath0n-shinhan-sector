import { useEffect, useMemo, useRef, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, Tooltip, XAxis, YAxis } from 'recharts'

const sourceSummary = [
  { label: 'Tại quầy', share: '52%', color: 'bg-sky-500' },
  { label: 'Ứng dụng giao hàng', share: '31%', color: 'bg-indigo-500' },
  { label: 'Ví điện tử', share: '17%', color: 'bg-emerald-500' },
]

function RevenueChart({ data }) {
  const chartRef = useRef(null)
  const [chartWidth, setChartWidth] = useState(0)

  const totalRevenue = useMemo(() => data.reduce((sum, item) => sum + item.revenue, 0), [data])
  const peakHour = useMemo(() => data.reduce((peak, item) => (item.revenue > peak.revenue ? item : peak), data[0]), [data])

  useEffect(() => {
    if (!chartRef.current) return undefined

    const updateSize = () => {
      setChartWidth(chartRef.current?.clientWidth ?? 0)
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(chartRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-w-0 rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Doanh thu theo khung giờ</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Theo dõi nhịp bán hàng từ mở ca đến cuối buổi</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Doanh thu được gom theo giờ để nhận biết khung cao điểm, tỷ trọng kênh bán và thời điểm cần tăng nhân sự hoặc bổ sung hàng.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[320px]">
          <div className="rounded-2xl bg-slate-100 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Tổng hôm nay</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{totalRevenue.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} triệu</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3">
            <p className="text-xs font-medium text-emerald-700">Cao điểm</p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">{peakHour.hour}</p>
          </div>
          <div className="rounded-2xl bg-sky-50 px-4 py-3">
            <p className="text-xs font-medium text-sky-700">Đơn/giờ cao nhất</p>
            <p className="mt-1 text-sm font-semibold text-sky-800">23 đơn</p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-3">
            <p className="text-xs font-medium text-amber-700">Khuyến nghị</p>
            <p className="mt-1 text-sm font-semibold text-amber-800">Tăng châm hàng 17:00</p>
          </div>
        </div>
      </div>

      <div ref={chartRef} className="mt-6 h-80 min-w-0">
        {chartWidth > 0 ? (
          <AreaChart width={chartWidth} height={320} data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.03} />
              </linearGradient>
              <linearGradient id="counterFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `${value}tr`} />
            <Tooltip
              cursor={{ stroke: '#38bdf8', strokeDasharray: '3 3' }}
              contentStyle={{
                borderRadius: '18px',
                border: '1px solid rgba(148,163,184,0.18)',
                boxShadow: '0 20px 50px rgba(15,23,42,0.12)',
                backgroundColor: 'rgba(255,255,255,0.96)',
              }}
              formatter={(value, name) => {
                const labels = {
                  revenue: 'Tổng doanh thu',
                  counter: 'Tại quầy',
                  deliveryApps: 'Ứng dụng giao hàng',
                  wallet: 'Ví điện tử',
                }

                return [`${value.toLocaleString('vi-VN')} triệu VND`, labels[name] ?? name]
              }}
            />
            <Area type="monotone" dataKey="counter" stroke="#6366f1" strokeWidth={2} fill="url(#counterFill)" />
            <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fill="url(#revenueFill)" dot={{ r: 4, fill: '#0284c7', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#0369a1', stroke: '#fff', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="deliveryApps" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="wallet" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </AreaChart>
        ) : (
          <div className="grid h-full animate-pulse grid-cols-8 items-end gap-3">
            {[34, 42, 55, 72, 80, 76, 68, 54].map((height) => (
              <div key={height} className="rounded-t-3xl bg-sky-100" style={{ height: `${height}%` }} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {sourceSummary.map((item) => (
          <div key={item.label} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${item.color}`} />
                <span className="font-semibold text-slate-900">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-slate-500">{item.share}</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">Tỷ trọng doanh thu hiện tại giúp xác định kênh cần ưu tiên nhân sự và tồn kho.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RevenueChart
