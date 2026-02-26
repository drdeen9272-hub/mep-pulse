import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Globe, Heart, Shield, Microscope, MapPin, Smartphone } from "lucide-react";

const partners = [
  { name: "NMEP", full: "National Malaria Elimination Programme", role: "Primary government partner for malaria surveillance and control strategy" },
  { name: "NAFDAC", full: "National Agency for Food & Drug Administration", role: "Regulatory partner for pharmaceutical authentication and counterfeit detection" },
  { name: "Gates Foundation", full: "Bill & Melinda Gates Foundation", role: "Strategic funding target for digital health innovation and malaria surveillance scale-up" },
  { name: "Global Fund", full: "The Global Fund to Fight AIDS, TB and Malaria", role: "Major funder of Nigeria's malaria commodities and health system strengthening" },
  { name: "WHO", full: "World Health Organization", role: "Sets global surveillance standards and malaria elimination strategy that guide platform design" },
  { name: "Audere", full: "Audere Inc.", role: "Technology partner providing AI-powered RDT interpretation integrated into the AISHA platform" },
];

const healthStructure = [
  { tier: "Federal", desc: "Federal Ministry of Health & NMEP set national policy and coordinate the malaria elimination strategy across all 36 states + FCT.", icon: Building2 },
  { tier: "State", desc: "36 State Malaria Elimination Programmes (SMEPs) adapt national guidelines and manage state-level implementation across 774 LGAs.", icon: MapPin },
  { tier: "LGA / Primary", desc: "Primary Healthcare Centres (PHCs) provide frontline malaria testing and treatment. Over 30,000 facilities nationwide.", icon: Heart },
  { tier: "PPMV Network", desc: "8,000+ Patent & Proprietary Medicine Vendors — the first point of care for 60% of Nigerians. Sproxil connects them digitally.", icon: Smartphone },
];

const platformFeatures = [
  { title: "Test", desc: "AI-powered RDT interpretation via WhatsApp reaches community health workers in remote areas", icon: Microscope },
  { title: "Treat", desc: "SMS/WhatsApp pharmaceutical authentication ensures genuine ACTs reach patients", icon: Shield },
  { title: "Track", desc: "Post-authentication health surveys build a real-time Digital MIS across 774 districts", icon: Globe },
  { title: "Incentivize", desc: "Conditional mobile money transfers reward completion of the full care pathway", icon: Users },
];

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function About() {
  return (
    <div className="container py-8 space-y-16">
      {/* Hero */}
      <motion.section className="text-center max-w-3xl mx-auto" {...fadeUp}>
        <h1 className="font-heading text-4xl font-bold">About AISHA Platform</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Africa's most comprehensive malaria intelligence platform — combining pharmaceutical authentication,
          AI diagnostics, real-time surveillance, and behavioral incentives to support Nigeria's malaria elimination goals.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">36 States</Badge>
          <Badge variant="secondary">774 LGAs</Badge>
          <Badge variant="secondary">8,000+ PPMVs</Badge>
          <Badge variant="secondary">4.5B+ Authentications</Badge>
          <Badge variant="secondary">5 Languages</Badge>
        </div>
      </motion.section>

      {/* Test-Treat-Track */}
      <motion.section {...fadeUp} transition={{ delay: 0.1 }}>
        <h2 className="font-heading text-2xl font-bold text-center mb-8">The Test-Treat-Track Model</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((f) => (
            <Card key={f.title} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <f.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Nigeria Healthcare Structure */}
      <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
        <h2 className="font-heading text-2xl font-bold text-center mb-2">Nigeria's Healthcare Structure</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Understanding the three-tier health system and the critical role of PPMVs as the primary point of care for most Nigerians.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {healthStructure.map((h) => (
            <Card key={h.tier}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <h.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{h.tier}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Partners */}
      <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
        <h2 className="font-heading text-2xl font-bold text-center mb-8">Partners & Stakeholders</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <Card key={p.name} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{p.name}</Badge>
                </CardTitle>
                <p className="text-xs text-muted-foreground">{p.full}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Glossary */}
      <motion.section {...fadeUp} transition={{ delay: 0.4 }}>
        <h2 className="font-heading text-2xl font-bold text-center mb-8">Key Terms</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { term: "LGA", def: "Local Government Area — Nigeria's 774 administrative districts, the primary unit of health service delivery" },
                { term: "PPMV", def: "Patent & Proprietary Medicine Vendor — licensed drug retailers serving as the first point of care for ~60% of Nigerians" },
                { term: "NMEP", def: "National Malaria Elimination Programme — the federal body coordinating Nigeria's malaria control and elimination strategy" },
                { term: "NAFDAC", def: "National Agency for Food and Drug Administration and Control — regulates pharmaceuticals and food products in Nigeria" },
                { term: "ACT", def: "Artemisinin-based Combination Therapy — the WHO-recommended first-line treatment for P. falciparum malaria" },
                { term: "RDT", def: "Rapid Diagnostic Test — a point-of-care immunochromatographic test that detects malaria antigens in a blood sample" },
                { term: "DHIS2", def: "District Health Information Software 2 — the national health management information system used across Nigeria" },
                { term: "IPTp", def: "Intermittent Preventive Treatment in pregnancy — sulfadoxine-pyrimethamine given during antenatal visits" },
              ].map((g) => (
                <div key={g.term} className="flex gap-3">
                  <Badge variant="secondary" className="h-fit shrink-0 text-xs">{g.term}</Badge>
                  <p className="text-sm text-muted-foreground">{g.def}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Disclaimer */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-5 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Demo Data Disclaimer:</strong> All data shown in this platform is simulated for demonstration purposes.
            It reflects realistic patterns based on Nigeria's malaria epidemiology but does not represent actual surveillance records.
            For official malaria statistics, please refer to the{" "}
            <a href="https://nmcp.gov.ng" target="_blank" rel="noopener" className="text-secondary underline">NMEP</a> and{" "}
            <a href="https://www.who.int/teams/global-malaria-programme" target="_blank" rel="noopener" className="text-secondary underline">WHO Global Malaria Programme</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
