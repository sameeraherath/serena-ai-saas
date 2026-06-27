import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export default function CTA() {
  const sectionRef = useScrollReveal<HTMLElement>()

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="reveal relative flex flex-col items-center px-4 py-32 text-center sm:py-40"
    >
      {/* Subtle coral radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(218,119,86,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <h2 className="relative text-3xl font-serif tracking-tight text-foreground sm:text-4xl md:text-[40px]">
        You deserve to feel better.
      </h2>
      <p className="relative mt-4 max-w-md text-lg text-secondary-foreground">
        Start your first conversation free. No credit card. No commitment.
      </p>

      <Button
        className="relative mt-8 h-[52px] rounded-[26px] px-10 text-base transition-all duration-300 hover:scale-[1.02]"
        aria-label="Talk to Serena now"
      >
        Talk to Serena now
      </Button>

      <p className="relative mt-4 text-sm text-secondary-foreground">
        Thousands of people started here.
      </p>
    </section>
  )
}
