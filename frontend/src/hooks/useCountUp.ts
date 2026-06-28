import { useState, useEffect, useRef } from "react"

interface UseCountUpOptions {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  start?: number
}

export function useCountUp({
  end,
  duration = 2000,
  delay = 0,
  prefix = "",
  suffix = "",
  start = 0,
}: UseCountUpOptions) {
  const [displayValue, setDisplayValue] = useState(`${prefix}${start}${suffix}`)
  const [hasTriggered, setHasTriggered] = useState(false)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (hasTriggered) return
    setHasTriggered(true)

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp
        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.round(start + (end - start) * eased)

        setDisplayValue(`${prefix}${current.toLocaleString()}${suffix}`)

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafRef.current)
    }
  }, [end, duration, delay, prefix, suffix, start, hasTriggered])

  return displayValue
}
