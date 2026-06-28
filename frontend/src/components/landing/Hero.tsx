import { useState, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { useTypewriter } from "@/hooks/useTypewriter"
import { Star } from "lucide-react"

const CHAT_MESSAGES = [
  {
    text: "I don't even know where to start. Everything just feels heavy lately.",
    sender: "user" as const,
    appearDelay: 0,
  },
  {
    text: "That's okay. You don't need to have the right words. Just tell me what's on your mind — however it comes out.",
    sender: "ai" as const,
    appearDelay: 600,
  },
  {
    text: "I think I'm just… tired of pretending I'm fine all the time.",
    sender: "user" as const,
    appearDelay: 3500,
  },
]

const HEADLINE_WORDS = ["It's", "okay", "to", "not", "be", "okay."]

function TypewriterMessage({ text, delay }: { text: string; delay: number }) {
  const [started, setStarted] = useState(false)

  const onDelayEnd = useCallback(() => {
    setStarted(true)
  }, [])

  if (!started) {
    return <DelayedTrigger delay={delay} onReady={onDelayEnd} />
  }

  return <TypewriterContent text={text} />
}

function DelayedTrigger({ delay, onReady }: { delay: number; onReady: () => void }) {
  useEffect(() => {
    const id = setTimeout(onReady, delay)
    return () => clearTimeout(id)
  }, [delay, onReady])
  return (
    <div className="flex items-center gap-1 rounded-[18px_18px_18px_4px] px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
    </div>
  )
}

function TypewriterContent({ text }: { text: string }) {
  const { displayText } = useTypewriter({ text, speed: 25 })
  return (
    <p className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed text-foreground"
      style={{
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "18px 18px 18px 4px",
      }}
    >
      {displayText}
    </p>
  )
}

export default function Hero() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:flex-row lg:gap-12 lg:px-12 lg:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 coral-glow-strong"
        aria-hidden="true"
      />

      {/* Floating decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-float-slow absolute left-[10%] top-[15%] h-32 w-32 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(218, 119, 86, 0.4) 0%, transparent 70%)" }}
        />
        <div className="animate-float-medium absolute right-[15%] top-[25%] h-40 w-40 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(232, 201, 176, 0.5) 0%, transparent 70%)" }}
        />
        <div className="animate-float-fast absolute bottom-[20%] left-[20%] h-24 w-24 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(218, 119, 86, 0.3) 0%, transparent 70%)" }}
        />
        <div className="animate-float-medium absolute right-[10%] bottom-[30%] h-28 w-28 rounded-full opacity-12"
          style={{ background: "radial-gradient(circle, rgba(200, 180, 160, 0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Left: Text + CTA */}
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
        <h1 className="font-serif text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block animate-text-reveal opacity-0"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {word}{" "}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-md text-base text-secondary-foreground sm:text-lg">
          Serena listens without judgment — free, private, and here whenever you need her.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
          <Button
            className="magnetic-btn h-[52px] rounded-[26px] px-10 text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
            aria-label="Talk to Serena now"
            onClick={() => navigate(user ? "/chat" : "/register")}
          >
            Talk to Serena now
          </Button>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 text-sm text-secondary-foreground transition-colors duration-200 hover:text-foreground"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            See how it works &darr;
          </a>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-secondary-foreground">
          <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3.5 w-3.5 ${star === 5 ? "fill-primary/40 text-primary/40" : "fill-primary text-primary"}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span>4.9</span>
          <span aria-hidden="true" className="text-border">·</span>
          <span>Trusted by thousands</span>
        </div>
      </div>

      {/* Right: Chat preview */}
      <div className="relative z-10 mt-12 w-full max-w-[540px] lg:mt-0">
        <div className="glass space-y-4 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              S
            </div>
            <span className="text-sm font-medium text-foreground">Serena</span>
          </div>

          {CHAT_MESSAGES.map((msg, i) => {
            const isFirst = i === 0
            if (msg.sender === "ai") {
              return (
                <div key={i} className="flex justify-start" style={isFirst ? {} : { animationDelay: `${msg.appearDelay}ms` }}>
                  <div className="mr-2 flex-shrink-0 self-end">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                      S
                    </div>
                  </div>
                  <TypewriterMessage text={msg.text} delay={msg.appearDelay} />
                </div>
              )
            }

            return (
              <div
                key={i}
                className="chat-bubble flex justify-end"
                style={{ animationDelay: `${msg.appearDelay}ms` }}
              >
                <p className="max-w-[85%] rounded-[18px_18px_4px_18px] bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                  {msg.text}
                </p>
                <div className="ml-2 flex-shrink-0 self-end">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-foreground/20 text-xs font-semibold text-foreground">
                    Y
                  </div>
                </div>
              </div>
            )
          })}

          <div
            className="flex items-center gap-2 rounded-[20px] border px-4 py-2.5"
            style={{
              borderColor: "rgba(232, 201, 176, 0.5)",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <span className="flex-1 text-xs text-muted-foreground typing-cursor">
              Type anything on your mind...
            </span>
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/80"
              aria-hidden="true"
            >
              <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
