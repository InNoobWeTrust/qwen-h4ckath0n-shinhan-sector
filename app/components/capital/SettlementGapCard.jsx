import ContextualCapitalCard from './ContextualCapitalCard'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function SettlementGapCard({ pendingAmount, delayDuration, delayedCount, onViewSolution, onViewDetails, onDismiss }) {
  return (
    <ContextualCapitalCard
      headline="Đối soát chậm, cần bổ sung vốn ngắn hạn?"
      description={`Có ${delayedCount} đơn đang trễ đối soát, có thể gây thiếu dòng tiền tạm thời trong ca. Nếu cần duy trì thanh toán nhà cung cấp hoặc nhập thêm hàng, có thể xem giải pháp hỗ trợ ngắn hạn.`}
      meta={`Tiền chờ đối soát: ${formatCurrency(pendingAmount)} • Trễ nhất: ${delayDuration}`}
      onViewSolution={onViewSolution}
      onViewDetails={onViewDetails}
      onDismiss={onDismiss}
    />
  )
}

export default SettlementGapCard
