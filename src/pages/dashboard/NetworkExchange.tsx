import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity, Globe, Shield, Zap, ArrowUpDown, Server,
  CheckCircle2, AlertTriangle, Radio, Network, Building2, Users,
  HeartPulse, TestTube, Pill, TrendingUp
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, AreaChart, Area } from "recharts";

/* ── Node Types ── */
type NodeType = "state" | "facility" | "pillar" | "partner";
type TxType = "case_report" | "drug_verification" | "rdt_result" | "supply_alert";

interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  status: "online" | "degraded" | "offline";
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  type: TxType;
  timestamp: Date;
  detail: string;
  amount?: string;
}

/* ── Static Data ── */
const txTypeConfig: Record<TxType, { label: string; color: string; icon: string }> = {
  case_report: { label: "CASE RPT", color: "hsl(var(--destructive))", icon: "🔴" },
  drug_verification: { label: "DRUG VER", color: "hsl(var(--secondary))", icon: "🟢" },
  rdt_result: { label: "RDT RES", color: "hsl(var(--accent))", icon: "🟡" },
  supply_alert: { label: "SUPPLY", color: "hsl(var(--primary))", icon: "🔵" },
};

const networkNodes: NetworkNode[] = [
  // Central Hub
  { id: "HUB", label: "AISHA Central", type: "pillar", x: 50, y: 50, status: "online" },
  // Program Pillars (inner ring)
  { id: "SURV", label: "Surveillance", type: "pillar", x: 50, y: 20, status: "online" },
  { id: "DIAG", label: "Diagnostics", type: "pillar", x: 80, y: 35, status: "online" },
  { id: "TREAT", label: "Treatment", type: "pillar", x: 80, y: 65, status: "online" },
  { id: "PREV", label: "Prevention", type: "pillar", x: 50, y: 80, status: "online" },
  { id: "FIN", label: "Financing", type: "pillar", x: 20, y: 65, status: "online" },
  { id: "SUPPLY", label: "Supply Chain", type: "pillar", x: 20, y: 35, status: "online" },
  // Partner Organizations (outer)
  { id: "WHO", label: "WHO", type: "partner", x: 50, y: 5, status: "online" },
  { id: "GF", label: "Global Fund", type: "partner", x: 92, y: 25, status: "online" },
  { id: "NMEP", label: "NMEP", type: "partner", x: 92, y: 75, status: "online" },
  { id: "PMI", label: "PMI/USAID", type: "partner", x: 50, y: 95, status: "online" },
  { id: "GATES", label: "Gates Fdn", type: "partner", x: 8, y: 75, status: "online" },
  { id: "GAVI", label: "Gavi", type: "partner", x: 8, y: 25, status: "online" },
  // Key States (scattered)
  { id: "KN", label: "Kano", type: "state", x: 35, y: 15, status: "online" },
  { id: "LA", label: "Lagos", type: "state", x: 15, y: 50, status: "online" },
  { id: "AB", label: "Abuja", type: "state", x: 42, y: 42, status: "online" },
  { id: "RV", label: "Rivers", type: "state", x: 30, y: 75, status: "online" },
  { id: "KD", label: "Kaduna", type: "state", x: 65, y: 15, status: "online" },
  { id: "OG", label: "Ogun", type: "state", x: 18, y: 82, status: "online" },
  { id: "BN", label: "Borno", type: "state", x: 75, y: 10, status: "degraded" },
  { id: "KB", label: "Kebbi", type: "state", x: 12, y: 15, status: "online" },
  { id: "BY", label: "Bayelsa", type: "state", x: 35, y: 88, status: "online" },
  // Facilities
  { id: "F1", label: "NAUTH", type: "facility", x: 58, y: 38, status: "online" },
  { id: "F2", label: "LUTH", type: "facility", x: 25, y: 55, status: "online" },
  { id: "F3", label: "AKTH", type: "facility", x: 40, y: 28, status: "online" },
  { id: "F4", label: "UCH Ibadan", type: "facility", x: 28, y: 65, status: "online" },
];

const connections: [string, string][] = [
  ["HUB", "SURV"], ["HUB", "DIAG"], ["HUB", "TREAT"], ["HUB", "PREV"], ["HUB", "FIN"], ["HUB", "SUPPLY"],
  ["SURV", "WHO"], ["DIAG", "GF"], ["TREAT", "NMEP"], ["PREV", "PMI"], ["FIN", "GATES"], ["SUPPLY", "GAVI"],
  ["KN", "SURV"], ["LA", "DIAG"], ["AB", "HUB"], ["RV", "TREAT"], ["KD", "SUPPLY"], ["OG", "PREV"],
  ["BN", "SURV"], ["KB", "PREV"], ["BY", "TREAT"],
  ["F1", "DIAG"], ["F2", "TREAT"], ["F3", "SURV"], ["F4", "DIAG"],
];

const states = ["Kano", "Lagos", "Abuja", "Rivers", "Kaduna", "Ogun", "Borno", "Kebbi", "Bayelsa", "Katsina", "Sokoto", "Zamfara", "Jigawa", "Bauchi", "Plateau", "Nasarawa", "Niger", "Kwara", "Oyo", "Delta", "Edo", "Imo", "Anambra", "Enugu", "Ebonyi", "Cross River", "Akwa Ibom", "Abia", "Taraba", "Adamawa", "Gombe", "Yobe", "Benue", "Kogi", "Ondo", "Osun", "Ekiti"];
const facilities = ["PHC Gwagwalada", "Gen. Hospital Maiduguri", "FMC Abeokuta", "PHC Birnin Kebbi", "NAUTH Nnewi", "UCH Ibadan", "LUTH Lagos", "AKTH Kano", "JUTH Jos", "FMC Lokoja"];
const drugs = ["ACT (Coartem)", "SP/Fansidar", "Artesunate Inj.", "Quinine", "Primaquine", "Artemether"];

function generateTx(id: number): Transaction {
  const types: TxType[] = ["case_report", "drug_verification", "rdt_result", "supply_alert"];
  const type = types[Math.floor(Math.random() * types.length)];
  const state = states[Math.floor(Math.random() * states.length)];
  const facility = facilities[Math.floor(Math.random() * facilities.length)];
  const drug = drugs[Math.floor(Math.random() * drugs.length)];

  const details: Record<TxType, string> = {
    case_report: `P. falciparum confirmed | ${state} → NMEP | Severity: ${["Uncomplicated", "Severe", "Pregnancy"][Math.floor(Math.random() * 3)]}`,
    drug_verification: `${drug} VERIFIED ✓ | ${facility} | Batch: SPX-${2024}-${String(Math.floor(Math.random() * 900000) + 100000)}`,
    rdt_result: `mRDT ${Math.random() > 0.35 ? "POSITIVE" : "NEGATIVE"} | ${facility} | AI Confidence: ${(92 + Math.random() * 7).toFixed(1)}%`,
    supply_alert: `${drug} stock ${Math.random() > 0.5 ? "LOW" : "CRITICAL"} | ${state} | ${Math.floor(Math.random() * 14) + 1} days remaining`,
  };

  return {
    id: `TX-${String(id).padStart(8, "0")}`,
    from: state,
    to: ["NMEP", "AISHA Central", "WHO", "Global Fund"][Math.floor(Math.random() * 4)],
    type,
    timestamp: new Date(),
    detail: details[type],
  };
}

const throughputData = [
  { hour: "00:00", cases: 1240, verifications: 890, rdts: 2100, alerts: 45 },
  { hour: "04:00", cases: 680, verifications: 420, rdts: 1200, alerts: 22 },
  { hour: "08:00", cases: 3200, verifications: 2800, rdts: 5400, alerts: 120 },
  { hour: "12:00", cases: 4800, verifications: 4200, rdts: 7800, alerts: 89 },
  { hour: "16:00", cases: 5200, verifications: 3900, rdts: 6200, alerts: 156 },
  { hour: "20:00", cases: 3100, verifications: 2100, rdts: 4100, alerts: 67 },
  { hour: "Now", cases: 4400, verifications: 3500, rdts: 5900, alerts: 98 },
];

const dailyVolume = [
  { day: "Mon", volume: 42800 }, { day: "Tue", volume: 45200 }, { day: "Wed", volume: 48900 },
  { day: "Thu", volume: 51200 }, { day: "Fri", volume: 47600 }, { day: "Sat", volume: 28400 }, { day: "Sun", volume: 22100 },
];

/* ── Animated Rolling Counter ── */
function RollingDigit({ digit, delay = 0 }: { digit: string; delay?: number }) {
  const isNum = /\d/.test(digit);
  if (!isNum) return <span className="inline-block">{digit}</span>;

  return (
    <span className="relative inline-block h-[1em] w-[0.65em] overflow-hidden">
      <motion.span
        className="absolute inset-0 flex flex-col items-center"
        initial={{ y: "-100%" }}
        animate={{ y: `${-Number(digit) * 10}%` }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex h-[1em] items-center justify-center shrink-0">{n}</span>
        ))}
      </motion.span>
    </span>
  );
}

function AnimatedLiveCounter({ value, label, sublabel, color, glowColor, icon: Icon }: {
  value: number;
  label: string;
  sublabel: string;
  color: string;
  glowColor: string;
  icon: React.ElementType;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [flash, setFlash] = useState(false);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      setFlash(true);
      // Animate from previous to new value
      const start = prevValue.current;
      const end = value;
      const duration = 600;
      const startTime = Date.now();
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(start + (end - start) * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      prevValue.current = value;
      setTimeout(() => setFlash(false), 400);
    }
  }, [value]);

  const formatted = displayValue.toLocaleString();

  return (
    <motion.div
      className="relative flex flex-col items-center rounded-2xl border p-5 overflow-hidden"
      style={{
        borderColor: flash ? glowColor : "hsl(var(--border))",
        boxShadow: flash ? `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}15` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Background pulse */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ background: `radial-gradient(circle at center, ${glowColor}12, transparent 70%)` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center">
        <Icon className="h-6 w-6 mb-2" style={{ color }} />
        <div className="font-mono text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ color }}>
          {formatted.split("").map((char, i) => (
            <RollingDigit key={`${i}-${char}`} digit={char} delay={i * 0.03} />
          ))}
        </div>
        <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{sublabel}</p>
      </div>

      {/* Subtle scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glowColor}40, transparent)` }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

/* ── Live Stats Hero ── */
function LiveStatsHero({ totalToday, txCount }: { totalToday: number; txCount: number }) {
  const [casesToday, setCasesToday] = useState(12_840);
  const [drugsVerified, setDrugsVerified] = useState(9_720);
  const [rdtsProcessed, setRdtsProcessed] = useState(18_930);
  const [livesProtected, setLivesProtected] = useState(2_847_291);

  useEffect(() => {
    const interval = setInterval(() => {
      setCasesToday((v) => v + Math.floor(Math.random() * 5) + 1);
      setDrugsVerified((v) => v + Math.floor(Math.random() * 4) + 1);
      setRdtsProcessed((v) => v + Math.floor(Math.random() * 7) + 2);
      setLivesProtected((v) => v + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-2xl border bg-card overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(hsl(var(--secondary)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }} />

      {/* Scanning bar */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] z-10"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--secondary) / 0.4), transparent)" }}
        animate={{ top: ["-2px", "calc(100% + 2px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 p-6">
        {/* Title bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <motion.div
                className="absolute inset-0 h-3 w-3 rounded-full bg-secondary"
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <span className="font-mono text-xs font-semibold text-secondary uppercase tracking-widest">
              Live Malaria Intelligence Feed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-secondary/50 text-secondary font-mono text-[9px] gap-1.5">
              <Radio className="h-2 w-2 animate-pulse" />
              {new Date().toLocaleTimeString("en-NG")}
            </Badge>
            <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
              TX #{String(txCount).padStart(8, "0")}
            </Badge>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <AnimatedLiveCounter
            value={casesToday}
            label="Cases Reported"
            sublabel="P. falciparum confirmed today"
            color="hsl(var(--destructive))"
            glowColor="hsl(var(--destructive))"
            icon={Activity}
          />
          <AnimatedLiveCounter
            value={drugsVerified}
            label="Drugs Verified"
            sublabel="Antimalarials authenticated"
            color="hsl(var(--secondary))"
            glowColor="hsl(var(--secondary))"
            icon={Shield}
          />
          <AnimatedLiveCounter
            value={rdtsProcessed}
            label="RDTs Processed"
            sublabel="AI-read diagnostic results"
            color="hsl(var(--accent))"
            glowColor="hsl(var(--accent))"
            icon={Zap}
          />
          <AnimatedLiveCounter
            value={livesProtected}
            label="Lives Protected"
            sublabel="Cumulative since launch"
            color="hsl(var(--primary))"
            glowColor="hsl(var(--primary))"
            icon={Users}
          />
        </div>

        {/* Throughput bar */}
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-2.5">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Throughput</span>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--secondary)), hsl(var(--accent)))" }}
              animate={{ width: ["60%", "78%", "65%", "82%", "70%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-secondary">{totalToday.toLocaleString()}/day</span>
          <div className="hidden sm:flex items-center gap-4 ml-4 border-l border-border pl-4">
            {[
              { label: "Cases", color: "bg-destructive", rate: "5.8/s" },
              { label: "Verify", color: "bg-secondary", rate: "4.4/s" },
              { label: "RDT", color: "bg-accent", rate: "8.6/s" },
              { label: "Alerts", color: "bg-primary", rate: "0.6/s" },
            ].map((ch) => (
              <div key={ch.label} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${ch.color}`} />
                <span className="text-[9px] text-muted-foreground">{ch.label}</span>
                <span className="font-mono text-[9px] font-semibold text-foreground">{ch.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Components ── */
function NetworkVisualization() {
  const [activePulse, setActivePulse] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => setActivePulse((p) => (p + 1) % connections.length), 600);
    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case "pillar": return "hsl(var(--secondary))";
      case "partner": return "hsl(var(--accent))";
      case "state": return "hsl(var(--primary))";
      case "facility": return "hsl(var(--muted-foreground))";
    }
  };

  const getNodeSize = (type: NodeType) => {
    switch (type) {
      case "pillar": return 8;
      case "partner": return 6;
      case "state": return 5;
      case "facility": return 4;
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-card" style={{ aspectRatio: "16/10" }}>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {/* Connections */}
        {connections.map(([from, to], i) => {
          const fromNode = networkNodes.find((n) => n.id === from);
          const toNode = networkNodes.find((n) => n.id === to);
          if (!fromNode || !toNode) return null;
          const isActive = i === activePulse;
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={fromNode.x} y1={fromNode.y}
                x2={toNode.x} y2={toNode.y}
                stroke={isActive ? "hsl(var(--secondary))" : "hsl(var(--border))"}
                strokeWidth={isActive ? 0.4 : 0.15}
                opacity={isActive ? 0.9 : 0.4}
              />
              {isActive && (
                <circle r="0.8" fill="hsl(var(--secondary))">
                  <animateMotion dur="0.8s" repeatCount="1">
                    <mpath xlinkHref={`#path-${i}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="1;0" dur="0.8s" />
                </circle>
              )}
              <path id={`path-${i}`} d={`M${fromNode.x},${fromNode.y} L${toNode.x},${toNode.y}`} fill="none" />
            </g>
          );
        })}

        {/* Nodes */}
        {networkNodes.map((node) => {
          const size = getNodeSize(node.type);
          const color = getNodeColor(node.type);
          return (
            <g key={node.id}>
              {/* Pulse ring for hub */}
              {node.id === "HUB" && (
                <>
                  <circle cx={node.x} cy={node.y} r={size + 2} fill="none" stroke={color} strokeWidth="0.2" opacity="0.3">
                    <animate attributeName="r" values={`${size + 1};${size + 5}`} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0" dur="2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              {/* Node dot */}
              <circle
                cx={node.x} cy={node.y} r={size / 2}
                fill={node.status === "degraded" ? "hsl(var(--destructive))" : color}
                opacity={0.9}
              />
              {/* Online glow */}
              <circle cx={node.x} cy={node.y} r={size / 2 + 0.5} fill="none" stroke={color} strokeWidth="0.15" opacity="0.5" />
              {/* Label */}
              <text
                x={node.x} y={node.y + size / 2 + 2.5}
                textAnchor="middle"
                fill="hsl(var(--foreground))"
                fontSize={node.type === "pillar" ? "2.2" : "1.8"}
                fontWeight={node.type === "pillar" ? "bold" : "normal"}
                opacity={0.8}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 flex gap-3 rounded-md bg-card/80 px-2 py-1 backdrop-blur-sm text-[10px]">
        {([["Program Pillar", "secondary"], ["Partner", "accent"], ["State", "primary"], ["Facility", "muted-foreground"]] as const).map(([label, color]) => (
          <span key={label} className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: `hsl(var(--${color}))` }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TransactionTicker({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="h-[420px] overflow-hidden">
      <div className="space-y-1">
        <AnimatePresence initial={false}>
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2 rounded-md border border-border/50 bg-muted/30 px-3 py-2 font-mono text-[11px]"
            >
              <span className="shrink-0 text-muted-foreground">{tx.timestamp.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
              <Badge variant="outline" className="shrink-0 text-[9px] px-1.5 py-0" style={{ borderColor: txTypeConfig[tx.type].color, color: txTypeConfig[tx.type].color }}>
                {txTypeConfig[tx.type].label}
              </Badge>
              <span className="text-foreground/80 leading-tight">{tx.detail}</span>
              <span className="ml-auto shrink-0 text-muted-foreground">{tx.id}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function NetworkExchange() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    Array.from({ length: 12 }, (_, i) => generateTx(847290 + i))
  );
  const [txCount, setTxCount] = useState(847302);
  const [totalToday, setTotalToday] = useState(48_291);

  useEffect(() => {
    const interval = setInterval(() => {
      setTxCount((c) => c + 1);
      setTotalToday((t) => t + Math.floor(Math.random() * 3) + 1);
      setTransactions((prev) => {
        const next = [generateTx(txCount + 1), ...prev];
        return next.slice(0, 50);
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [txCount]);

  const networkStats = [
    { label: "Transactions Today", value: totalToday.toLocaleString(), icon: ArrowUpDown, color: "text-secondary" },
    { label: "Nodes Online", value: "37 / 37", icon: Server, color: "text-secondary" },
    { label: "Avg Latency", value: "142ms", icon: Zap, color: "text-accent" },
    { label: "Uptime (30d)", value: "99.97%", icon: CheckCircle2, color: "text-secondary" },
    { label: "States Connected", value: "36 + FCT", icon: Globe, color: "text-primary" },
    { label: "Active Facilities", value: "8,247", icon: Building2, color: "text-accent" },
    { label: "Partner Feeds", value: "6 / 6", icon: Network, color: "text-secondary" },
    { label: "Active Alerts", value: "12", icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="container py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-secondary" />
            <h1 className="font-heading text-2xl font-bold">AISHA Network Exchange</h1>
            <Badge variant="outline" className="border-secondary text-secondary text-[10px] gap-1">
              <Radio className="h-2.5 w-2.5 animate-pulse" /> LIVE
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time malaria data interchange — connecting 36 states, 8,247 facilities, and 6 global partners.
            Modelled after SWIFT/CIPS architecture for health sector data settlement.
          </p>
        </div>
        <div className="font-mono text-xs text-muted-foreground text-right">
          <p>Protocol: AISHA-MX v2.1</p>
          <p>Network ID: NG-MALARIA-2025</p>
        </div>
      </div>

      {/* Live Stats Hero — the headline real-time counters */}
      <LiveStatsHero totalToday={totalToday} txCount={txCount} />

      {/* KPI Strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
        {networkStats.map((s) => (
          <Card key={s.label} className="bg-card/50">
            <CardContent className="flex flex-col items-center p-3 text-center">
              <s.icon className={`h-5 w-5 mb-1 ${s.color}`} />
              <p className="text-lg font-bold font-mono">{s.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Map + Ticker */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4 text-secondary" />
                Network Topology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NetworkVisualization />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-secondary" />
                Transaction Feed
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  #{String(txCount).padStart(8, "0")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionTicker transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Throughput Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Throughput by Channel (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="rdts" name="RDT Results" stackId="1" fill="hsl(var(--accent))" stroke="hsl(var(--accent))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="verifications" name="Drug Verifications" stackId="1" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="cases" name="Case Reports" stackId="1" fill="hsl(var(--destructive))" stroke="hsl(var(--destructive))" fillOpacity={0.3} />
                <Area type="monotone" dataKey="alerts" name="Supply Alerts" stackId="1" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daily Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={dailyVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => v.toLocaleString()} />
                <Bar dataKey="volume" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Type Breakdown */}
      <div className="grid gap-4 md:grid-cols-4">
        {(Object.entries(txTypeConfig) as [TxType, typeof txTypeConfig[TxType]][]).map(([key, config]) => {
          const counts: Record<TxType, number> = {
            case_report: 12840, drug_verification: 9720, rdt_result: 18930, supply_alert: 1420,
          };
          const rates: Record<TxType, string> = {
            case_report: "+8.2%", drug_verification: "+12.1%", rdt_result: "+5.7%", supply_alert: "-3.4%",
          };
          return (
            <Card key={key}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-[10px]" style={{ borderColor: config.color, color: config.color }}>
                    {config.icon} {config.label}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{rates[key]} vs yesterday</span>
                </div>
                <p className="text-2xl font-bold font-mono">{counts[key].toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground mt-1">transactions today</p>
                {/* Mini progress */}
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: config.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(counts[key] / 18930) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Settlement Protocol Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="font-heading text-sm font-semibold mb-1 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-secondary" /> Data Settlement Protocol
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every malaria data transaction is cryptographically timestamped and settled within 200ms.
                The AISHA-MX protocol ensures end-to-end integrity from point-of-care to national dashboards,
                similar to how SWIFT settles financial transactions between banks.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold mb-1 flex items-center gap-1.5">
                <Network className="h-4 w-4 text-accent" /> Multi-Source Interoperability
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AISHA-MX ingests data from DHIS2, Sproxil NMDR, facility EMRs, PPMV terminals,
                and community health worker devices — normalizing into a unified schema for
                real-time national malaria intelligence.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold mb-1 flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" /> Participant Network
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                36 states + FCT, 774 LGAs, 8,247 PPMVs, 6 global partners, and over 30,000
                health facilities participate in the AISHA Network Exchange — processing an
                average of 48,000+ data transactions daily.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
