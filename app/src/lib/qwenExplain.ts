// Dual-mode: static in dev, Qwen Cloud in demo mode
// ENV=local → static Vietnamese text (no API call)
// ENV=demo  → Qwen3.6-plus API call

interface QwenExplanation {
  summary: string
  positiveNarrative: string
  negativeNarrative: string
  whatIf: string
}

function getStaticExplanation(merchantId: string): QwenExplanation {
  const texts: Record<string, QwenExplanation> = {
    M1: {
      summary: "Hồ sơ vận hành ổn định, doanh thu đều đặn từ nhiều kênh.",
      positiveNarrative: "Doanh thu theo tuần ổn định trong suốt 90 ngày. Tỷ lệ đối soát đúng hạn duy trì ở mức cao. Nguồn thu đến từ nhiều kênh POS, MoMo và Shopee.",
      negativeNarrative: "Có một cụm doanh thu giảm nhẹ giữa tuần cần theo dõi. Tỷ lệ hoàn trả tăng nhẹ trong 30 ngày gần nhất. Một nhóm giao dịch lặp giá trị cần tiếp tục quan sát.",
      whatIf: "Doanh thu bình quân tháng tăng thêm 10% và giữ refund rate dưới 2% → Điểm có thể tăng lên khoảng 772 và hạn mức hiển thị lên 100M"
    },
    M2: {
      summary: "Hồ sơ ở mức trung bình, cần cải thiện ổn định dòng tiền.",
      positiveNarrative: "Lịch sử giao dịch đã đủ dài để tham chiếu. Đối soát thanh toán diễn ra khá đều. Doanh thu vẫn duy trì được mức nền cơ bản mỗi tháng.",
      negativeNarrative: "Doanh thu biến động khá mạnh theo tuần. Tỷ lệ hoàn trả cao hơn nhóm hồ sơ tốt. Mới có hai nguồn dữ liệu được xác minh.",
      whatIf: "Giảm refund rate xuống dưới 3% và thêm 1 nguồn dữ liệu mới như Shopee → Điểm có thể tăng lên khoảng 690 và hạn mức hiển thị lên 50M"
    },
    M3: {
      summary: "Hồ sơ yếu, cần đa dạng nguồn thu và cải thiện tỷ lệ hoàn.",
      positiveNarrative: "Hồ sơ đã có dữ liệu giao dịch vượt 90 ngày. Dòng tiền vẫn được đối soát khá thường xuyên. Có hoạt động bán hàng lặp lại theo các khung giờ quen thuộc.",
      negativeNarrative: "Doanh thu biến động mạnh và thiếu ổn định. Tỷ lệ hoàn trả cao trong 30 ngày gần nhất. Chỉ có một nguồn dữ liệu được xác minh.",
      whatIf: "Thêm nguồn MoMo hoặc Shopee, giảm refund rate xuống dưới 4%, không có tuần trống giao dịch → Điểm có thể tăng lên khoảng 620 và đủ điều kiện cho khoản vay nhỏ 10M"
    }
  }
  return texts[merchantId] ?? texts.M1
}

export async function explainWithQwen(
  merchantId: string,
  score: number,
  positiveCodes: string[],
  negativeCodes: string[]
): Promise<QwenExplanation> {
  const isDemo = typeof process !== 'undefined' && process.env?.ENV === 'demo'

  if (!isDemo) {
    return getStaticExplanation(merchantId)
  }

  // Qwen Cloud call for demo mode
  const apiKey = typeof process !== 'undefined' ? process.env?.DASHSCOPE_API_KEY : undefined
  if (!apiKey) {
    return getStaticExplanation(merchantId)
  }

  try {
    const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen3.6-plus',
        messages: [
          {
            role: 'system',
            content: `Bạn là trợ lý giải thích tín dụng cho doanh nhân Việt Nam.
Bạn chỉ được dịch/render các lý do có trong danh sách cho phép.
Không được phép thêm, bớt, hoặc thay đổi bất kỳ thông tin nào.
Luôn trả lời bằng JSON hợp lệ.`
          },
          {
            role: 'user',
            content: `Merchant: ${merchantId}\nĐiểm: ${score}/850\nCác yếu tố tích cực: ${positiveCodes.join(', ')}\nCác yếu tố tiêu cực: ${negativeCodes.join(', ')}\n\nTrả lời JSON với: summary, positiveNarrative, negativeNarrative, whatIf`
          }
        ],
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      return getStaticExplanation(merchantId)
    }

    const data = await response.json()
    return JSON.parse(data.choices[0].message.content)
  } catch {
    return getStaticExplanation(merchantId)
  }
}

export { getStaticExplanation }
