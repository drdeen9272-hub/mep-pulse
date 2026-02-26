import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { type SubnationalCountry, type Province, getProvinceBurdenColor } from "@/data/subnationalData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  data: SubnationalCountry;
  countryName: string;
}

const trendIcon = (t: string) => {
  if (t === "improving") return <TrendingUp className="h-3 w-3 text-green-600" />;
  if (t === "declining") return <TrendingDown className="h-3 w-3 text-destructive" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

export default function SubnationalMap({ data, countryName }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredProv = data.provinces.find(p => p.code === hovered);

  const top10 = [...data.provinces]
    .sort((a, b) => (b.population * b.incidencePerThousand) - (a.population * a.incidencePerThousand))
    .slice(0, 10);

  const chartData = top10.map(p => ({
    name: p.name.length > 14 ? p.name.slice(0, 12) + "…" : p.name,
    cases: Math.round(p.population * p.incidencePerThousand),
    color: getProvinceBurdenColor(p.incidencePerThousand),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Map */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-1 font-heading text-sm font-semibold">Subnational Malaria Burden</h3>
        <p className="mb-3 text-xs text-muted-foreground">Hover for details. Bubble size reflects population × incidence.</p>
        <div className="relative">
          <svg viewBox={data.viewBox} className="w-full h-auto">
            {data.provinces.map(prov => {
              const pos = data.positions[prov.code];
              if (!pos) return null;
              const isHovered = hovered === prov.code;
              const radius = Math.max(8, Math.min(24, Math.sqrt(prov.population * prov.incidencePerThousand / 50)));

              return (
                <g
                  key={prov.code}
                  onMouseEnter={() => setHovered(prov.code)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={pos.x} cy={pos.y} r={radius}
                    fill={getProvinceBurdenColor(prov.incidencePerThousand)}
                    opacity={isHovered ? 0.95 : 0.65}
                    stroke={isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.15)"}
                    strokeWidth={isHovered ? 2 : 0.5}
                    style={{ transition: "all 0.15s ease" }}
                  />
                  <text
                    x={pos.x} y={pos.y + 1}
                    textAnchor="middle" dominantBaseline="central"
                    className="pointer-events-none select-none"
                    style={{
                      fontSize: isHovered ? "7px" : "5px",
                      fontWeight: isHovered ? 700 : 600,
                      fill: "hsl(var(--foreground))",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {prov.code}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {hoveredProv && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-2 top-2 z-10 rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur-sm text-xs space-y-1"
              >
                <div className="font-semibold flex items-center gap-1.5">{hoveredProv.name} {trendIcon(hoveredProv.trend)}</div>
                <div className="text-muted-foreground">Pop: {hoveredProv.population}M</div>
                <div>Incidence: {hoveredProv.incidencePerThousand}/1,000</div>
                <div>ITN Coverage: {hoveredProv.itnCoverage}%</div>
                <div>Test Positivity: {hoveredProv.testPositivityRate}%</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-2 text-center">
          <p className="text-[10px] font-medium text-muted-foreground mb-1">Incidence per 1,000</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-muted-foreground">
            {[
              { label: "<50", color: "hsl(140 60% 50%)" },
              { label: "50–99", color: "hsl(50 90% 75%)" },
              { label: "100–199", color: "hsl(45 90% 60%)" },
              { label: "200–299", color: "hsl(35 85% 55%)" },
              { label: "300–399", color: "hsl(25 80% 50%)" },
              { label: "400+", color: "hsl(0 70% 50%)" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top provinces chart + table */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-3 font-heading text-sm font-semibold">Top Provinces by Burden</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 10 }}>
            <XAxis type="number" tick={{ fontSize: 9 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={75} />
            <Tooltip formatter={(v: number) => [`${(v / 1000).toFixed(0)}K estimated cases`, ""]} />
            <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
              {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Province table */}
        <div className="mt-4 max-h-48 overflow-y-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-1.5 pr-2">Province</th>
                <th className="pb-1.5 pr-2 text-right">Pop (M)</th>
                <th className="pb-1.5 pr-2 text-right">Inc/1K</th>
                <th className="pb-1.5 pr-2 text-right">ITN%</th>
                <th className="pb-1.5 pr-2 text-right">TPR%</th>
                <th className="pb-1.5">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[...data.provinces].sort((a, b) => b.incidencePerThousand - a.incidencePerThousand).map(p => (
                <tr key={p.code} className="border-b border-muted/40">
                  <td className="py-1 pr-2 font-medium">{p.name}</td>
                  <td className="py-1 pr-2 text-right">{p.population}</td>
                  <td className="py-1 pr-2 text-right">{p.incidencePerThousand}</td>
                  <td className="py-1 pr-2 text-right">{p.itnCoverage}</td>
                  <td className="py-1 pr-2 text-right">{p.testPositivityRate}</td>
                  <td className="py-1">{trendIcon(p.trend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
