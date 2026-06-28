import { Leaf } from "lucide-react"

const LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact", href: "#" },
  { label: "About", href: "#" },
]

export default function Footer() {
  return (
    <footer
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
      style={{ borderTop: "1px solid rgba(232, 201, 176, 0.5)" }}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-[13px] text-secondary-foreground">
          <Leaf className="h-4 w-4 text-primary/60" aria-hidden="true" />
          <span className="font-medium text-foreground">Serena AI</span>
          <span aria-hidden="true">·</span>
          <span>&copy; 2026</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-secondary-foreground" aria-label="Footer links">
          {LINKS.map((link, i) => (
            <span key={link.label} className="flex items-center gap-4">
              <a
                href={link.href}
                className="transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
              {i < LINKS.length - 1 && (
                <span aria-hidden="true" className="text-border">·</span>
              )}
            </span>
          ))}
        </nav>

        <p className="text-[13px] text-secondary-foreground">
          Made with care for your mind.
        </p>
      </div>
    </footer>
  )
}
