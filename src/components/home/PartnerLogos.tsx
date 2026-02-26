import { motion } from "framer-motion";

const partners = [
  "NMEP", "NAFDAC", "Audere", "Novartis", "Cipla",
  "Emzor", "Fidson", "May & Baker", "Swiss Pharma",
  "Chi Pharmaceuticals", "Tuyil", "Neimeth",
];

export default function PartnerLogos() {
  return (
    <section className="border-y bg-card py-10">
      <div className="container">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Partners &amp; Pharmaceutical Brands
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((name, i) => (
              <div
                key={i}
                className="flex h-10 shrink-0 items-center rounded-md bg-muted px-5 text-sm font-semibold text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </motion.div>
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />
        </div>
      </div>
    </section>
  );
}
