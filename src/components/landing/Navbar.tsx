import { useState, useCallback, useEffect, useRef } from "react"
import { Leaf } from "lucide-react"

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Talk to Serena", href: "#cta" },
] as const

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.replace("#", "")
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    },
    []
  )

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
      <div ref={menuRef} className="pointer-events-auto">
        {/* Floating pill trigger */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="glass flex items-center gap-6 rounded-full px-6 py-3 transition-all duration-300 hover:shadow-lg"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">Serena</span>
          </span>

          <span
            className={`text-sm text-secondary-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            &#8595;
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="glass mt-3 overflow-hidden rounded-2xl py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-6 py-3 text-sm text-secondary-foreground transition-colors duration-200 hover:bg-white/30 hover:text-foreground ${
                  link.href === "#cta" ? "font-medium text-primary hover:text-primary" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
