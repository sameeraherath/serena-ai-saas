import { Button } from "@/components/ui/button"

const CHAT_MESSAGES = [
  {
    text: "I don't even know where to start. Everything just feels heavy lately.",
    sender: "user" as const,
    delay: 0,
  },
  {
    text: "That's okay. You don't need to have the right words. Just tell me what's on your mind — however it comes out.",
    sender: "ai" as const,
    delay: 400,
  },
  {
    text: "I think I'm just… tired of pretending I'm fine all the time.",
    sender: "user" as const,
    delay: 800,
  },
]

export default function Hero() {
  const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-32 sm:px-6"
    >
      {/* ===== Chat preview — the hero element ===== */}
      <div className="w-full max-w-[540px]">
        <div className="glass space-y-4 p-5 sm:p-6">
          {/* Chat header */}
          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
              aria-hidden="true"
            >
              S
            </div>
            <span className="text-sm font-medium text-foreground">Serena</span>
          </div>

          {/* Messages */}
          {CHAT_MESSAGES.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${msg.delay}ms` }}
            >
              {msg.sender === "ai" && (
                <div className="mr-2 flex-shrink-0">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary"
                    aria-hidden="true"
                  >
                    S
                  </div>
                </div>
              )}

              <p
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "rounded-[18px_18px_4px_18px] bg-primary text-primary-foreground"
                    : "rounded-[18px_18px_18px_4px] text-foreground"
                }`}
                style={
                  msg.sender === "ai"
                    ? {
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        boxShadow: "none",
                        borderRadius: "18px 18px 18px 4px",
                      }
                    : undefined
                }
              >
                {msg.text}
              </p>

              {msg.sender === "user" && (
                <div className="ml-2 flex-shrink-0">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-foreground/20 text-xs font-semibold text-foreground"
                    aria-hidden="true"
                  >
                    Y
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          <div
            className="chat-bubble flex justify-start"
            style={{ animationDelay: "1200ms" }}
          >
            <div className="mr-2 flex-shrink-0">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary"
                aria-hidden="true"
              >
                S
              </div>
            </div>
            <div
              className="flex items-center gap-1 rounded-[18px_18px_18px_4px] px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              aria-label="Serena is typing"
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Headline — now supporting the chat ===== */}
      <h1 className="mt-14 max-w-2xl text-center font-serif text-3xl leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        It&apos;s okay to not be okay.
      </h1>

      {/* Subheadline */}
      <p className="mt-5 max-w-md text-center text-base text-secondary-foreground sm:text-lg">
        Serena listens without judgment — free, private, and here whenever you need her.
      </p>

      {/* Primary CTA */}
      <Button
        className="mt-8 h-[52px] rounded-[26px] px-10 text-base transition-all duration-300 hover:scale-[1.02]"
        aria-label="Talk to Serena now"
      >
        Talk to Serena now
      </Button>

      {/* Secondary action — text link */}
      <a
        href="#how-it-works"
        onClick={scrollToHowItWorks}
        className="mt-4 text-sm text-secondary-foreground transition-colors duration-200 hover:text-foreground"
      >
        See how it works &darr;
      </a>
    </section>
  )
}
