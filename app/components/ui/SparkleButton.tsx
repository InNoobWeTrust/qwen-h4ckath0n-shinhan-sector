import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import { Loader2, Sparkles } from "lucide-react"

const COOLDOWN_MS = 3000

interface SparkleButtonProps {
  onClick?: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export default function SparkleButton({
  onClick,
  loading = false,
  disabled = false,
  className = "",
  children,
}: SparkleButtonProps) {
  const lastClickedAtRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)
  const [isCoolingDown, setIsCoolingDown] = useState(false)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    if (disabled || loading) {
      return
    }

    const now = Date.now()
    if (now - lastClickedAtRef.current < COOLDOWN_MS) {
      return
    }

    lastClickedAtRef.current = now
    setIsCoolingDown(true)

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsCoolingDown(false)
    }, COOLDOWN_MS)

    void Promise.resolve(onClick?.())
  }

  const isDisabled = disabled || loading || isCoolingDown

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      <span>{children ?? "Giải thích AI"}</span>
    </button>
  )
}
