import { useEffect, useMemo, useState } from "react"
import { ChevronDown, RotateCcw } from "lucide-react"
import { marked } from "marked"

interface ExplanationPanelProps {
  explanation: string | null
  loading: boolean
  error: string | null
  info?: string | null
  onRetry?: () => void | Promise<void>
  title?: string
  className?: string
}

export default function ExplanationPanel({
  explanation,
  loading,
  error,
  info,
  onRetry,
  title = "Giải thích AI",
  className = "",
}: ExplanationPanelProps) {
  const [open, setOpen] = useState(false)
  const hasContent = loading || Boolean(error) || Boolean(explanation)

  useEffect(() => {
    if (hasContent) {
      setOpen(true)
    }
  }, [hasContent, explanation, error, loading])

  const renderedMarkdown = useMemo(() => {
    if (!explanation) return ""
    const result = marked.parse(explanation)
    return typeof result === "string" ? result : ""
  }, [explanation])

  if (!hasContent) {
    return null
  }

  return (
    <div className={`overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Đang tạo giải thích..."
              : error
                ? explanation
                  ? "Đang hiển thị giải thích mặc định kèm cảnh báo."
                  : "Cần thử lại để nhận giải thích."
                : "Nhấn để thu gọn hoặc mở rộng."}
          </p>
        </div>
        <ChevronDown className={`h-5 w-5 text-slate-400 transition ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-4 py-4">
            {loading ? (
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-500">
                Hệ thống đang tổng hợp diễn giải cho merchant này.
              </div>
            ) : null}

            {!loading && explanation ? (
              <div className="space-y-3">
                {info ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900">
                    {info}
                  </div>
                ) : null}
                <div className="rounded-2xl bg-slate-50 px-5 py-4">
                  <div
                    className="markdown-content text-sm text-slate-700 leading-7"
                    dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
                  />
                </div>
              </div>
            ) : null}

            {!loading && error ? (
              <div className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
                <p className="font-semibold">⚠ Đang hiển thị giải thích mặc định</p>
                <p className="mt-1">{error}</p>
                {onRetry ? (
                  <button
                    type="button"
                    onClick={() => void Promise.resolve(onRetry())}
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Thử lại
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
