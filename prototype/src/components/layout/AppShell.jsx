import { useState } from 'react'
import { CalendarDays, LayoutGrid, Store } from 'lucide-react'
import CreditScoreModal from '../CreditScoreModal'
import Dashboard from '../Dashboard'
import LoanApplicationModal from '../LoanApplicationModal'
import CapitalSupportView from '../capital/CapitalSupportView'
import InventoryOverview from '../inventory/InventoryOverview'
import OrdersHub from '../orders/OrdersHub'
import ReceiptCenter from '../receipts/ReceiptCenter'
import ShiftOverview from '../staff/ShiftOverview'
import { capitalPackage, scoreBreakdown } from '../../data/mockData'
import TopNav from './TopNav'

const tabs = [
  { id: 'tong-quan', label: 'Tổng quan' },
  { id: 'ban-hang', label: 'Bán hàng' },
  { id: 'don-hang', label: 'Đơn hàng' },
  { id: 'kho-hang', label: 'Kho hàng' },
  { id: 'nhan-vien', label: 'Nhân viên' },
  { id: 'bien-lai', label: 'Biên lai' },
  { id: 'phan-tich', label: 'Phân tích' },
  { id: 'von-kinh-doanh', label: 'Vốn kinh doanh', secondary: true },
]

function PlaceholderModule({ label }) {
  return (
    <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex h-[320px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-slate-50 text-center">
        <div className="rounded-2xl bg-sky-100 p-4 text-sky-700">
          <LayoutGrid className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">{label}</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">Module đang được chuẩn bị trong giai đoạn 2. Tab này hiện giữ chỗ để hoàn thiện luồng vận hành POS.</p>
      </div>
    </div>
  )
}

function AppShell() {
  const [activeTab, setActiveTab] = useState('tong-quan')
  const [showCreditScore, setShowCreditScore] = useState(false)
  const [showLoanApplication, setShowLoanApplication] = useState(false)
  const [capitalContext, setCapitalContext] = useState(null)
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'Tổng quan'

  const openCapitalSolution = (context) => {
    setCapitalContext(context)
    setShowLoanApplication(true)
  }

  const openCapitalDetails = (context) => {
    setCapitalContext(context)
    setShowCreditScore(true)
  }

  const closeCapitalSolution = () => {
    setShowLoanApplication(false)
    setCapitalContext(null)
  }

  const closeCapitalDetails = () => {
    setShowCreditScore(false)
    setCapitalContext(null)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(186,230,253,0.72),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.16),_transparent_24%),linear-gradient(180deg,#eff6ff_0%,#f8fafc_38%,#f3f8ff_100%)] text-slate-700">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%)]" />
      <div className="absolute left-[-120px] top-40 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="absolute right-[-160px] top-[22rem] h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="rounded-[36px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 ring-1 ring-sky-100">
                <Store className="h-4 w-4" />
                Shinhan Soft POS
              </div>
              <h1 className="mt-4 font-['Be_Vietnam_Pro',sans-serif] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Trung tâm điều hành cho cửa hàng tiện lợi
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                Tập trung bán hàng, đơn hàng, kho, nhân sự, biên lai và phân tích hằng ngày. Vốn kinh doanh chỉ xuất hiện khi gắn với nhu cầu vận hành thực tế.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[340px]">
              <div className="rounded-[24px] bg-slate-950 p-4 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-100">Module đang xem</p>
                <p className="mt-2 text-lg font-semibold">{activeLabel}</p>
              </div>
              <div className="rounded-[24px] bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-100">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays className="h-4 w-4" />
                  Ngày kinh doanh
                </div>
                <p className="mt-2 text-lg font-semibold">Thứ Hai, 13/04/2026</p>
              </div>
            </div>
          </div>

          <TopNav activeTab={activeTab} onChange={setActiveTab} tabs={tabs} />
        </header>

        <main className="mt-6">
          {activeTab === 'tong-quan' ? <Dashboard /> : null}
          {activeTab === 'don-hang' ? <OrdersHub onOpenCapitalSolution={openCapitalSolution} onOpenCapitalDetails={openCapitalDetails} /> : null}
          {activeTab === 'kho-hang' ? <InventoryOverview onOpenCapitalSolution={openCapitalSolution} onOpenCapitalDetails={openCapitalDetails} /> : null}
          {activeTab === 'nhan-vien' ? <ShiftOverview /> : null}
          {activeTab === 'bien-lai' ? <ReceiptCenter /> : null}
          {activeTab === 'von-kinh-doanh' ? (
            <CapitalSupportView
              capitalPackage={capitalPackage}
              onOpenApplication={openCapitalSolution}
              onOpenEligibilityDetails={openCapitalDetails}
            />
          ) : null}
          {activeTab !== 'tong-quan' && activeTab !== 'don-hang' && activeTab !== 'kho-hang' && activeTab !== 'nhan-vien' && activeTab !== 'bien-lai' && activeTab !== 'von-kinh-doanh' ? <PlaceholderModule label={activeLabel} /> : null}
        </main>
      </div>

      <CreditScoreModal
        open={showCreditScore}
        onClose={closeCapitalDetails}
        score={745}
        maxScore={850}
        change={15}
        breakdown={scoreBreakdown}
        context={capitalContext}
      />
      <LoanApplicationModal open={showLoanApplication} onClose={closeCapitalSolution} context={capitalContext} />
    </div>
  )
}

export default AppShell
