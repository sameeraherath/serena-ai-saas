import { Heart, Shield, Clock } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const FEATURES = [
  {
    icon: Heart,
    title: "Talk freely",
    body: "Say what you really feel. No filters, no fear. Serena listens like a trusted friend who never judges.",
  },
  {
    icon: Shield,
    title: "Always private",
    body: "Your conversations stay yours. Always. We never share, sell, or store what you share.",
  },
  {
    icon: Clock,
    title: "Here at 2am",
    body: "Anxiety doesn't wait for office hours. Neither does Serena. Available every moment you need support.",
  },
] as const

export default function Features() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="features"
      ref={sectionRef}
      className="reveal mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36"
    >
      <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Everything you need to feel heard.
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-secondary-foreground">
        No appointments. No waiting rooms. Just a safe space.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            data-stagger
            className="glass flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 sm:p-10"
          >
            {/* Icon circle */}
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary/10">
              <feature.icon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-5 text-lg font-medium text-foreground">
              {feature.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary-foreground">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
