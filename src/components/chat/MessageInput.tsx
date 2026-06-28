import { useRef, useCallback, type KeyboardEvent } from "react"
import { ArrowUp } from "lucide-react"

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Type a message...",
}: MessageInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
      requestAnimationFrame(adjustHeight)
    },
    [onChange, adjustHeight]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (value.trim() && !disabled) {
          onSend()
        }
      }
    },
    [value, disabled, onSend]
  )

  const handleSendClick = useCallback(() => {
    if (value.trim() && !disabled) {
      onSend()
    }
  }, [value, disabled, onSend])

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-xl transition-shadow focus-within:border-primary/40 focus-within:shadow-md">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="max-h-40 flex-1 resize-none bg-transparent text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Type a message"
      />
      <button
        type="button"
        onClick={handleSendClick}
        disabled={!value.trim() || disabled}
        aria-label="Send message"
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
          value.trim() && !disabled
            ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  )
}
