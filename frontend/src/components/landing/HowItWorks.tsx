import { Fragment } from "react"
import { UserPlus, MessageCircle, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your account",
    body: "Sign up in 30 seconds. No credit card needed.",
  },
  {
    icon: MessageCircle,
    title: "Start talking",
    body: "Tell Serena how you're feeling. She's trained to listen and respond with care.",
  },
  {
    icon: Sparkles,
    title: "Feel the difference",
    body: "Users report feeling calmer after just one conversation.",
  },
] as const

export default function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="reveal section-divider mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36"
    >
      <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Feeling better is 3 steps away.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-secondary-foreground">
        No forms. No referrals. Just start.
      </p>

      <div className="mt-20 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
        {STEPS.map((step, i) => (
          <Fragment key={step.title}>
            <div
              data-stagger
              className="flex flex-1 flex-col items-center text-center"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full transition-all duration-500"
                style={{
                  background: "rgba(218, 119, 86, 0.08)",
                  boxShadow: "0 0 24px rgba(218, 119, 86, 0.06)",
                }}
              >
                <step.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
              </div>

              <div
                className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
                aria-hidden="true"
              >
                {i + 1}
              </div>

              <h3 className="mt-4 text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-secondary-foreground">
                {step.body}
              </p>
            </div>

            {i < STEPS.length - 1 && (
              <div className="hidden md:block md:mt-12" aria-hidden="true">
                <svg width="48" height="24" viewBox="0 0 48 24">
                  <path
                    d="M4 12h36"
                    stroke="rgba(218, 119, 86, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <path
                    d="M40 8l4 4-4 4"
                    stroke="rgba(218, 119, 86, 0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
