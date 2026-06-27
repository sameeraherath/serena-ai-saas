import { useScrollReveal } from "@/hooks/useScrollReveal"

const TESTIMONIALS = [
  {
    quote:
      "I used to stare at the ceiling for hours. Now I talk to Serena instead. It actually helps.",
    name: "Anika R.",
    detail: "27 · London",
  },
  {
    quote:
      "It doesn't judge me. That's literally all I needed. Someone — or something — that just listens.",
    name: "James T.",
    detail: "31 · Toronto",
  },
  {
    quote:
      "I was skeptical about AI for mental health. But Serena feels different. Warm. Real.",
    name: "Priya M.",
    detail: "24 · Singapore",
  },
] as const

export default function Testimonials() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="reveal mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36"
    >
      <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Real people. Real relief.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-secondary-foreground">
        You&apos;re not alone — thousands feel better after talking to Serena.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <blockquote
            key={item.name}
            data-stagger
            className="glass flex flex-col p-8 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Quote mark */}
            <span
              className="mb-3 text-5xl font-serif leading-none text-primary/40 select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <p className="flex-1 text-[15px] italic leading-relaxed text-foreground">
              {item.quote}
            </p>

            <footer className="mt-5">
              <cite className="not-italic">
                <span className="block text-sm font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="block text-sm text-secondary-foreground">
                  {item.detail}
                </span>
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
