import { useState, useEffect, useRef, useCallback } from "react"

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speed = 30,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    setDisplayText("")
    indexRef.current = 0
    setIsTyping(false)
    cleanup()

    const timeout = setTimeout(() => {
      setIsTyping(true)

      intervalRef.current = setInterval(() => {
        indexRef.current += 1
        setDisplayText(text.slice(0, indexRef.current))

        if (indexRef.current >= text.length) {
          cleanup()
          setIsTyping(false)
          onCompleteRef.current?.()
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cleanup()
    }
  }, [text, speed, delay, cleanup])

  return { displayText, isTyping }
}
