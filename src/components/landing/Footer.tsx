import { Leaf } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6"
      style={{ borderTop: "1px solid rgba(232, 201, 176, 0.5)" }}
    >
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Left — logo + copyright */}
        <div className="flex items-center gap-2 text-[13px] text-secondary-foreground">
          <Leaf className="h-4 w-4 text-primary/60" aria-hidden="true" />
          <span>Serena AI</span>
          <span aria-hidden="true">·</span>
          <span>&copy; 2025</span>
        </div>

        {/* Center — links */}
        <nav
          className="flex items-center gap-4 text-[13px] text-secondary-foreground"
          aria-label="Legal links"
        >
          <a
            href="#"
            className="transition-colors duration-300 hover:text-foreground"
          >
            Privacy Policy
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-foreground"
          >
            Terms
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="#"
            className="transition-colors duration-300 hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        {/* Right — tagline */}
        <p className="text-[13px] text-secondary-foreground">
          Made with care for your mind.
        </p>
      </div>
    </footer>
  )
}
