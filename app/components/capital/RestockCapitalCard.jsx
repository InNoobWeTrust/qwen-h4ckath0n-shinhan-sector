import ContextualCapitalCard from './ContextualCapitalCard'

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' VND'
}

function RestockCapitalCard({ item, reorderCostEstimate, onViewSolution, onViewDetails, onDismiss }) {
  return (
    <ContextualCapitalCard
      headline="Cần hỗ trợ nhập thêm hàng?"
      description={`${item.name} đang bán nhanh và tồn kho hiện tại có thể không đủ cho những ngày tới. Xem giải pháp vốn phù hợp cho nhu cầu hiện tại nếu cần xoay vòng tiền nhập hàng.`}
      meta={`Chi phí nhập lại ước tính: ${formatCurrency(reorderCostEstimate)}`}
      onViewSolution={onViewSolution}
      onViewDetails={onViewDetails}
      onDismiss={onDismiss}
    />
  )
}

export default RestockCapitalCard
