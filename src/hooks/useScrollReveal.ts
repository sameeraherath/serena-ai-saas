import { useEffect, useRef } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -40px 0px",
    staggerDelay = 150,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            if (once) observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin }
    )

    // Set stagger delays on children with data-stagger
    const staggerChildren = el.querySelectorAll<HTMLElement>("[data-stagger]")
    for (let i = 0; i < staggerChildren.length; i++) {
      staggerChildren[i].style.transitionDelay = `${i * staggerDelay}ms`
    }

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin, staggerDelay, once])

  return ref
}
