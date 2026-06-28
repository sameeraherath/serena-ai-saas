import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useCountUp } from "@/hooks/useCountUp"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const displayValue = useCountUp({ end: value, suffix, duration: 2000 })
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
        {displayValue}
      </span>
      <span className="mt-1 text-xs text-secondary-foreground sm:text-sm">
        {label}
      </span>
    </div>
  )
}

export default function CTA() {
  const sectionRef = useScrollReveal<HTMLElement>()
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="reveal relative mx-auto mt-28 max-w-5xl overflow-hidden rounded-[40px] px-6 py-20 text-center sm:px-12 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(218, 119, 86, 0.08) 0%, rgba(232, 201, 176, 0.06) 50%, rgba(218, 119, 86, 0.04) 100%)",
          border: "1px solid rgba(218, 119, 86, 0.15)",
          borderRadius: "40px",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(218, 119, 86, 0.3) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(232, 201, 176, 0.4) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <h2 className="relative font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
        You deserve to feel better.
      </h2>
      <p className="relative mt-4 text-lg text-secondary-foreground">
        Start your first conversation free. No credit card. No commitment.
      </p>

      <div className="relative mt-8 flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="h-4 w-4 fill-primary text-primary"
            aria-hidden="true"
          />
        ))}
        <span className="ml-2 text-sm font-medium text-secondary-foreground">
          Rated 4.9 by thousands of users
        </span>
      </div>

      <Button
        className="relative mt-6 h-[52px] rounded-[26px] px-10 text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
        aria-label="Talk to Serena now"
        onClick={() => navigate(user ? "/chat" : "/register")}
      >
        Talk to Serena now
      </Button>

      <div className="relative mt-12 grid grid-cols-3 gap-4">
        <CountUpStat value={10000} suffix="+" label="Conversations started" />
        <CountUpStat value={94} suffix="%" label="Users feel calmer" />
        <div className="flex flex-col items-center">
          <span className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            24/7
          </span>
          <span className="mt-1 text-xs text-secondary-foreground sm:text-sm">
            Always available
          </span>
        </div>
      </div>
    </section>
  )
}
