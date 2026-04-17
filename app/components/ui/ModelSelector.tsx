import { Link2 } from "lucide-react"

interface ModelSelectorProps {
  hasProvider: boolean
  providerLabel?: string
  onConfigure: () => void
  className?: string
}

export default function ModelSelector({
  hasProvider,
  providerLabel,
  onConfigure,
  className = "",
}: ModelSelectorProps) {
  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white p-3 shadow-sm ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Provider AI</p>
          <p className="mt-1 text-sm text-slate-500">
            {hasProvider && providerLabel
              ? `Đang dùng: ${providerLabel}`
              : "Chưa có provider nào được cấu hình."}
          </p>
        </div>
        <button
          type="button"
          onClick={onConfigure}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          <Link2 className="h-4 w-4" />
          {hasProvider ? "Đổi provider" : "Cấu hình provider"}
        </button>
      </div>
    </div>
  )
}
