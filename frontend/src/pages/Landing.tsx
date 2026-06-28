import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import HowItWorks from "@/components/landing/HowItWorks"
import Testimonials from "@/components/landing/Testimonials"
import CTA from "@/components/landing/CTA"
import Footer from "@/components/landing/Footer"

export default function Landing() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top ${showBackToTop ? "visible" : ""} fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110`}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(218, 119, 86, 0.25)",
          boxShadow: "0 4px 16px rgba(218, 119, 86, 0.12)",
        }}
        aria-label="Back to top"
      >
        <ChevronUp className="h-4 w-4 text-primary" />
      </button>
    </div>
  )
}
