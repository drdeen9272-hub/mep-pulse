import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import HeroAnimation from "@/components/home/HeroAnimation";
import HowItWorks from "@/components/home/HowItWorks";
import PartnerLogos from "@/components/home/PartnerLogos";
import ScrollReveal from "@/components/ScrollReveal";

const metrics = [
  { end: 4_500_000_000, suffix: "+", label: "Products Authenticated" },
  { end: 35_000_000, suffix: "+", label: "Consumers Engaged" },
  { end: 134_000, suffix: "+", label: "Health Surveys Completed" },
  { end: 8_000, suffix: "+", label: "Pharmacies Connected" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="overflow-hidden bg-background py-12 md:py-20">
        <div className="container">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
            {/* Left */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl font-extrabold leading-tight md:text-5xl lg:text-[3.25rem]">
                Africa's Most Comprehensive{" "}
                <span className="text-secondary">Malaria Intelligence</span>{" "}
                Platform
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground lg:mx-0">
                Real-time surveillance, AI-powered diagnostics, and pharmaceutical
                authentication across 774 districts in 36 states. Trusted by
                Nigeria's National Malaria Elimination Programme.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-lg transition hover:opacity-90"
                >
                  Explore Dashboard
                </Link>
                <button className="inline-flex items-center rounded-lg border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
                  Watch Demo
                </button>
              </div>
            </motion.div>

            {/* Right – animated phone */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HeroAnimation />
            </motion.div>
          </div>

          {/* KPI counters */}
          <ScrollReveal className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((m) => (
              <AnimatedCounter key={m.label} {...m} />
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* How it works */}
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      {/* Partner logos */}
      <ScrollReveal delay={0.1}>
        <PartnerLogos />
      </ScrollReveal>
    </div>
  );
}
