import { Button } from "@/components/ui/button"

const CHAT_MESSAGES = [
  {
    text: "Hi, I'm Serena. How are you feeling today?",
    sender: "ai" as const,
    delay: 0,
  },
  {
    text: "Honestly? Exhausted. Work has been overwhelming.",
    sender: "user" as const,
    delay: 300,
  },
  {
    text: "I hear you. That kind of exhaustion runs deep. Want to talk about what's been weighing on you most?",
    sender: "ai" as const,
    delay: 600,
  },
] as const

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-32 sm:px-6"
    >
      {/* Headline */}
      <h1 className="max-w-3xl text-center font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[56px]">
        It&apos;s okay to not be okay.
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-md text-center text-lg text-secondary-foreground sm:text-xl">
        Serena AI listens without judgment — 24/7, anytime you need.
      </p>

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button
          className="h-[52px] rounded-[26px] px-8 text-base transition-all duration-300 hover:scale-[1.02]"
          aria-label="Start talking free"
        >
          Start talking free
        </Button>
        <Button
          variant="outline"
          className="h-[52px] rounded-[26px] border-white/40 bg-white/10 px-8 text-base text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/20"
          aria-label="See how it works"
        >
          See how it works
        </Button>
      </div>

      {/* Chat preview card */}
      <div className="mt-16 w-full max-w-[480px]">
        <div className="glass space-y-3 p-5 sm:p-6">
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
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "rounded-[18px_18px_4px_18px] bg-primary text-primary-foreground"
                    : "glass rounded-[18px_18px_18px_4px] text-foreground"
                }`}
                style={
                  msg.sender === "ai"
                    ? {
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(10px)",
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-foreground/20 text-xs font-semibold text-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
