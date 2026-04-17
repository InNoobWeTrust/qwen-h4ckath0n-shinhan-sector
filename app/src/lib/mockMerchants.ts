import { computeScore, type ScoreComponents } from './creditScoring'

export interface MerchantProfile {
  id: string
  name: string
  businessType: string
  dataSources: string[]
  historyDays: number
  transactions: {
    totalRevenue: number      // VND
    txnCount: number
    refundRate: number        // 0-1
    uniquePayers: number
    avgMonthlyRevenue: number
    revenueCV: number
  }
  scores: ScoreComponents
  score: number
  band: string
  limit: number
  positiveFactors: string[]   // reason code IDs
  negativeFactors: string[]
  whatIf: { condition: string; improvement: string }
  change: string              // e.g. "+12 điểm"
  breakdown: Array<{ label: string; score: number; description: string }>
}

function createMerchant(profile: Omit<MerchantProfile, 'score' | 'band' | 'limit'>): MerchantProfile {
  return {
    ...profile,
    ...computeScore(profile.scores),
  }
}

const M1 = createMerchant({
  id: "M1",
  name: "Chị Linh",
  businessType: "Cửa hàng tiện lợi 24/7",
  dataSources: ["POS", "MoMo", "Shopee"],
  historyDays: 90,
  transactions: {
    totalRevenue: 286400000,
    txnCount: 1842,
    refundRate: 0.012,
    uniquePayers: 624,
    avgMonthlyRevenue: 95466667,
    revenueCV: 0.08,
  },
  scores: {
    revenue: 63,
    stability: 60,
    payment: 58,
    diversity: 43,
  },
  positiveFactors: ["R01", "R02", "R03", "R04"],
  negativeFactors: ["R06", "R07", "R10"],
  whatIf: {
    condition: "Duy trì tốc độ tăng trưởng hiện tại",
    improvement: "Điểm có thể đạt 810 trong 3 tháng tới",
  },
  change: "+12 điểm",
  breakdown: [
    { label: "Ổn định doanh thu", score: 82, description: "Doanh thu theo tuần ổn định trong suốt 90 ngày" },
    { label: "Thanh toán", score: 80, description: "Tỷ lệ đối soát đúng hạn duy trì ở mức cao" },
    { label: "Nhất quán kinh doanh", score: 85, description: "Nguồn thu đến từ 3 kênh: POS, MoMo và Shopee" },
  ],
})

const M2 = createMerchant({
  id: "M2",
  name: "Anh Hùng",
  businessType: "Quán trà sữa",
  dataSources: ["POS", "MoMo"],
  historyDays: 90,
  transactions: {
    totalRevenue: 118900000,
    txnCount: 742,
    refundRate: 0.058,
    uniquePayers: 188,
    avgMonthlyRevenue: 39633333,
    revenueCV: 0.22,
  },
  scores: {
    revenue: 54,
    stability: 50,
    payment: 52,
    diversity: 46,
  },
  positiveFactors: ["R01", "R02", "R04", "R05"],
  negativeFactors: ["R06", "R08", "R10"],
  whatIf: {
    condition: "Thêm kênh Shopee và giảm refund rate xuống dưới 3%",
    improvement: "Điểm có thể đạt 760 và hạn mức hiển thị lên 95M",
  },
  change: "-8 điểm",
  breakdown: [
    { label: "Ổn định doanh thu", score: 72, description: "Doanh thu ổn định qua các tháng với mức CV thấp" },
    { label: "Thanh toán", score: 70, description: "Tỷ lệ đối soát đúng hạn ở mức khá" },
    { label: "Nhất quán kinh doanh", score: 68, description: "Hoạt động đều đặn với lịch sử trên 90 ngày" },
  ],
})

const M3 = createMerchant({
  id: "M3",
  name: "Chị Mai",
  businessType: "Hàng quán vỉa hè",
  dataSources: ["POS"],
  historyDays: 90,
  transactions: {
    totalRevenue: 42300000,
    txnCount: 268,
    refundRate: 0.126,
    uniquePayers: 41,
    avgMonthlyRevenue: 14100000,
    revenueCV: 0.45,
  },
  scores: {
    revenue: 30,
    stability: 26,
    payment: 28,
    diversity: 18,
  },
  positiveFactors: ["R02", "R05"],
  negativeFactors: ["R06", "R07", "R08", "R09"],
  whatIf: {
    condition: "Thêm nguồn MoMo, giảm refund rate xuống dưới 4%, đảm bảo không có tuần trống giao dịch",
    improvement: "Điểm có thể tăng lên khoảng 620 và đủ điều kiện cho khoản vay nhỏ 10M",
  },
  change: "-18 điểm",
  breakdown: [
    { label: "Ổn định doanh thu", score: 38, description: "Doanh thu biến động mạnh theo tuần với hệ số CV cao" },
    { label: "Thanh toán", score: 42, description: "Tỷ lệ hoàn trả cao trong 30 ngày gần nhất" },
    { label: "Nhất quán kinh doanh", score: 28, description: "Chỉ có một nguồn dữ liệu được xác minh" },
  ],
})

const M4 = createMerchant({
  id: "M4",
  name: "Anh Khoa",
  businessType: "Cửa hàng linh kiện điện tử",
  dataSources: ["POS", "Website"],
  historyDays: 90,
  transactions: {
    totalRevenue: 220000000,
    txnCount: 1200,
    refundRate: 0.018,
    uniquePayers: 312,
    avgMonthlyRevenue: 73333333,
    revenueCV: 0.15,
  },
  scores: {
    revenue: 58,
    stability: 54,
    payment: 56,
    diversity: 48,
  },
  positiveFactors: ["R01", "R02", "R04", "R05"],
  negativeFactors: ["R06", "R08"],
  whatIf: {
    condition: "Thêm ví MoMo và duy trì refund rate dưới 2%",
    improvement: "Điểm có thể tăng lên 790 và hạn mức đạt 100M",
  },
  change: "+5 điểm",
  breakdown: [
    { label: "Ổn định doanh thu", score: 76, description: "Doanh thu ổn định với mức CV thấp" },
    { label: "Thanh toán", score: 74, description: "Tỷ lệ đối soát đúng hạn khá cao" },
    { label: "Nhất quán kinh doanh", score: 70, description: "Hoạt động ổn định trong 90 ngày qua" },
  ],
})

const M5 = createMerchant({
  id: "M5",
  name: "Chị Thảo",
  businessType: "Cửa hàng thời trang",
  dataSources: ["POS", "MoMo", "Shopee"],
  historyDays: 90,
  transactions: {
    totalRevenue: 320000000,
    txnCount: 1560,
    refundRate: 0.025,
    uniquePayers: 485,
    avgMonthlyRevenue: 106666667,
    revenueCV: 0.35,
  },
  scores: {
    revenue: 57,
    stability: 53,
    payment: 55,
    diversity: 48,
  },
  positiveFactors: ["R01", "R02", "R03", "R04"],
  negativeFactors: ["R06", "R09"],
  whatIf: {
    condition: "Thêm kênh TikTok Shop và duy trì tốc độ tăng trưởng hiện tại",
    improvement: "Điểm có thể đạt 800 và hạn mức hiển thị lên 100M",
  },
  change: "+15 điểm",
  breakdown: [
    { label: "Ổn định doanh thu", score: 78, description: "Doanh thu đều đặn qua các tháng" },
    { label: "Thanh toán", score: 82, description: "Tỷ lệ đối soát đúng hạn cao" },
    { label: "Nhất quán kinh doanh", score: 85, description: "Nguồn thu đến từ 3 kênh POS, MoMo và Shopee" },
  ],
})

export const mockMerchants: Record<string, MerchantProfile> = { M1, M2, M3, M4, M5 }
