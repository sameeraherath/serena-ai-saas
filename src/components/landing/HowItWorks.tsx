import { Fragment } from "react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const STEPS = [
  {
    title: "Create your account",
    body: "Sign up in 30 seconds. No credit card needed.",
  },
  {
    title: "Start talking",
    body: "Tell Serena how you're feeling. She's trained to listen and respond with care.",
  },
  {
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
      className="reveal mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36"
    >
      <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
              {/* Step number */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-[64px] font-light leading-none text-primary"
                style={{ background: "rgba(218, 119, 86, 0.08)" }}
                aria-hidden="true"
              >
                {i + 1}
              </div>

              <h3 className="mt-6 text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-secondary-foreground">
                {step.body}
              </p>
            </div>

            {/* Dashed connector (desktop only) */}
            {i < STEPS.length - 1 && (
              <div
                className="hidden h-0 w-16 border-t-2 border-dashed md:block md:mt-10"
                style={{ borderColor: "rgba(218, 119, 86, 0.3)" }}
                aria-hidden="true"
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
