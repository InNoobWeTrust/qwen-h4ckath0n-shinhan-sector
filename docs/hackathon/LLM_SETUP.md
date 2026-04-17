# LLM Explainability Setup

Chay cac lenh sau trong thu muc `app/` de nap secret cho tinh nang explainability:

```bash
wrangler secret put GPT_API_KEY
wrangler secret put QWEN_API_KEY
wrangler secret put QWEN_PASSWORD
```

Gia tri duoc su dung trong app:

- `GPT_API_KEY`: dung voi endpoint `https://api.kilo.dev/v1/chat/completions` va model `grok-code-fast-1`
- `QWEN_API_KEY`: dung voi endpoint `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions` va model `qwen-max`
- `QWEN_PASSWORD`: mat khau de mo khoa toggle Qwen tren giao dien demo

Luong xu ly:

1. Frontend goi `POST /api/explain-score` voi diem tong hoac diem tung tru cot.
2. Backend kiem tra `QWEN_PASSWORD` neu user chon `model: "qwen"`.
3. Neu goi upstream that bai hoac thieu API key, endpoint se tra ve giai thich fallback tinh.
