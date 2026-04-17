export interface ReasonCode {
  code: string
  vi: string
  en: string
  polarity: 'positive' | 'negative'
}

export const REASON_CODES: ReasonCode[] = [
  { code: "R01", vi: "Doanh thu ổn định hàng tháng", en: "Stable monthly revenue", polarity: "positive" },
  { code: "R02", vi: "Tỷ lệ đối soát đúng hạn cao", en: "High on-time settlement rate", polarity: "positive" },
  { code: "R03", vi: "Nguồn thu đa dạng", en: "Diverse revenue streams", polarity: "positive" },
  { code: "R04", vi: "Lịch sử giao dịch trên 90 ngày", en: "Transaction history over 90 days", polarity: "positive" },
  { code: "R05", vi: "Đối soát thanh toán thường xuyên", en: "Regular payment reconciliation", polarity: "positive" },
  { code: "R06", vi: "Doanh thu có biến động bất thường", en: "Abnormal revenue fluctuation", polarity: "negative" },
  { code: "R07", vi: "Tỷ lệ hoàn trả cao trong 30 ngày", en: "High refund rate in last 30 days", polarity: "negative" },
  { code: "R08", vi: "Ít nguồn dữ liệu được xác minh", en: "Few verified data sources", polarity: "negative" },
  { code: "R09", vi: "Khoảng thời gian không hoạt động", en: "Inactive period detected", polarity: "negative" },
  { code: "R10", vi: "Nghi vấn mô hình giao dịch", en: "Suspicious transaction pattern", polarity: "negative" },
]

export function getReasonCode(code: string): ReasonCode | undefined {
  return REASON_CODES.find(rc => rc.code === code)
}

export function expandFactors(codes: string[]): Array<{ code: string; text: string }> {
  return codes.map(code => {
    const rc = getReasonCode(code)
    return { code, text: rc?.vi ?? code }
  })
}
