export interface ScoreComponents {
  revenue: number
  stability: number
  payment: number
  diversity: number
}

const BASE_SCORE = 300
const MAX_SCORE = 850
const SCORE_MULTIPLIER = 8.5

function clampScore(score: number): number {
  return Math.max(BASE_SCORE, Math.min(MAX_SCORE, score))
}

export function computeScore(scores: ScoreComponents): { score: number; band: string; limit: number } {
  const weightedScore =
    scores.revenue * 0.35 +
    scores.stability * 0.25 +
    scores.payment * 0.25 +
    scores.diversity * 0.15

  const score = Math.round(clampScore(weightedScore * SCORE_MULTIPLIER + BASE_SCORE))

  return {
    score,
    band: getBand(score),
    limit: getLimit(score),
  }
}

export function getBand(score: number): string {
  if (score >= 750) return "Tốt"
  if (score >= 700) return "Khá"
  if (score >= 640) return "Trung bình"
  if (score >= 600) return "Yếu"
  return "Yếu nhiều"
}

export function getLimit(score: number): number {
  if (score >= 750) return 95000000
  if (score >= 700) return 75000000
  if (score >= 640) return 35000000
  if (score >= 600) return 12500000
  return 0
}

export function formatLimit(amount: number): string {
  if (amount === 0) return "Không đủ điều kiện"
  return `${(amount / 1000000).toLocaleString('vi-VN')} triệu VND`
}

export function getBandColor(band: string): string {
  switch (band) {
    case "Tốt": return "emerald"
    case "Khá": return "sky"
    case "Trung bình": return "amber"
    case "Yếu": return "orange"
    case "Yếu nhiều": return "rose"
    default: return "slate"
  }
}
