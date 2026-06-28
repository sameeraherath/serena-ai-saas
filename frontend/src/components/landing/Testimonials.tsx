import { Star } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const TESTIMONIALS = [
  {
    quote:
      "I used to stare at the ceiling for hours. Now I talk to Serena instead. It actually helps.",
    name: "Anika R.",
    detail: "27 · London",
    initials: "AR",
    avatarClass: "avatar-sand",
  },
  {
    quote:
      "It doesn't judge me. That's literally all I needed. Someone — or something — that just listens.",
    name: "James T.",
    detail: "31 · Toronto",
    initials: "JT",
    avatarClass: "avatar-sage",
  },
  {
    quote:
      "I was skeptical about AI for mental health. But Serena feels different. Warm. Real.",
    name: "Priya M.",
    detail: "24 · Singapore",
    initials: "PM",
    avatarClass: "avatar-lavender",
  },
  {
    quote:
      "After my divorce, I didn't want to burden friends. Serena became my safe space at 3am.",
    name: "David K.",
    detail: "42 · Melbourne",
    initials: "DK",
    avatarClass: "avatar-sky",
  },
  {
    quote:
      "My therapist actually recommended I try an AI companion between sessions. Serena is a game changer.",
    name: "Maria L.",
    detail: "35 · Barcelona",
    initials: "ML",
    avatarClass: "avatar-peach",
  },
  {
    quote:
      "I never thought typing to an AI would make me cry — in a good way. It's surprisingly human.",
    name: "Chen W.",
    detail: "29 · Vancouver",
    initials: "CW",
    avatarClass: "avatar-teal",
  },
] as const

const Stars = () => (
  <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className="h-3 w-3 fill-primary text-primary"
        aria-hidden="true"
      />
    ))}
  </div>
)

export default function Testimonials() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="reveal section-divider mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36"
    >
      <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Real people. Real relief.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-secondary-foreground">
        You&apos;re not alone — thousands feel better after talking to Serena.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <blockquote
            key={item.name}
            data-stagger
            className="glass group flex flex-col p-6 transition-all duration-300 sm:p-7"
          >
            <Stars />

            <p className="mt-3 flex-1 text-[15px] italic leading-relaxed text-foreground">
              &ldquo;{item.quote}&rdquo;
            </p>

            <footer className="mt-5 flex items-center gap-3">
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${item.avatarClass}`}
                aria-hidden="true"
              >
                {item.initials}
              </div>
              <cite className="not-italic">
                <span className="block text-sm font-semibold text-foreground">
                  {item.name}
                </span>
                <span className="block text-xs text-secondary-foreground">
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
