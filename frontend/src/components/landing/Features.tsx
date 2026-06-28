import { Heart, Shield, Clock } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const FEATURES = [
  {
    icon: Heart,
    title: "Talk freely",
    body: "Say what you really feel. No filters, no fear. Serena listens like a trusted friend who never judges.",
    glow: "rgba(218, 119, 86, 0.12)",
    iconBg: "rgba(218, 119, 86, 0.12)",
  },
  {
    icon: Shield,
    title: "Always private",
    body: "Your conversations stay yours. Always. We never share, sell, or store what you share.",
    glow: "rgba(140, 155, 126, 0.10)",
    iconBg: "rgba(140, 155, 126, 0.12)",
  },
  {
    icon: Clock,
    title: "Here at 2am",
    body: "Anxiety doesn't wait for office hours. Neither does Serena. Available every moment you need support.",
    glow: "rgba(163, 196, 217, 0.12)",
    iconBg: "rgba(163, 196, 217, 0.12)",
  },
] as const

export default function Features() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="features"
      ref={sectionRef}
      className="reveal section-divider mx-auto max-w-7xl px-4 pt-28 sm:px-6 sm:pt-36"
    >
      <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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
            className="glass group relative flex flex-col items-center overflow-hidden p-8 text-center transition-all duration-500 sm:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(ellipse at center, ${feature.glow} 0%, transparent 70%)` }}
              aria-hidden="true"
            />

            <div
              className="relative flex h-[48px] w-[48px] items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{ background: feature.iconBg }}
            >
              <feature.icon
                className="h-5 w-5 text-primary transition-transform duration-500 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>

            <h3 className="relative mt-5 text-lg font-medium text-foreground transition-colors duration-500 group-hover:text-primary">
              {feature.title}
            </h3>
            <p className="relative mt-3 text-[15px] leading-relaxed text-secondary-foreground">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
