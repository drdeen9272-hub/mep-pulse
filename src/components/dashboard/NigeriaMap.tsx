import { useState } from "react";
import { motion } from "framer-motion";
import { nigeriaStates, getStateBurden } from "@/data/nigeriaData";

// Simplified SVG layout positions for Nigeria states (relative grid)
const statePositions: Record<string, { x: number; y: number }> = {
  SO: { x: 90, y: 30 }, KB: { x: 55, y: 55 }, ZA: { x: 110, y: 65 },
  KT: { x: 150, y: 45 }, KN: { x: 180, y: 55 }, JG: { x: 210, y: 40 },
  YO: { x: 260, y: 40 }, BO: { x: 300, y: 50 },
  KD: { x: 155, y: 95 }, BA: { x: 230, y: 85 }, GO: { x: 260, y: 90 },
  AD: { x: 300, y: 100 }, TA: { x: 270, y: 120 },
  NI: { x: 115, y: 120 }, FC: { x: 165, y: 130 }, NA: { x: 195, y: 130 },
  PL: { x: 225, y: 120 }, BE: { x: 210, y: 150 },
  KW: { x: 100, y: 155 }, KG: { x: 150, y: 170 },
  OY: { x: 70, y: 180 }, OS: { x: 85, y: 200 }, EK: { x: 105, y: 210 },
  OG: { x: 55, y: 205 }, LA: { x: 40, y: 220 }, ON: { x: 110, y: 225 },
  ED: { x: 140, y: 215 }, DE: { x: 130, y: 240 },
  AN: { x: 165, y: 220 }, EN: { x: 190, y: 205 }, EB: { x: 210, y: 200 },
  IM: { x: 170, y: 240 }, AB: { x: 185, y: 245 },
  CR: { x: 235, y: 220 }, AK: { x: 215, y: 250 },
  RI: { x: 160, y: 265 }, BY: { x: 140, y: 275 },
};

export default function NigeriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredState = nigeriaStates.find((s) => s.code === hovered);

  const getColor = (burden: number) => {
    if (burden >= 1.4) return "hsl(0 70% 50%)";
    if (burden >= 1.0) return "hsl(25 80% 55%)";
    if (burden >= 0.7) return "hsl(45 90% 55%)";
    return "hsl(50 90% 70%)";
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-3 font-heading text-sm font-semibold">Malaria Incidence by State</h3>
      <div className="relative">
        <svg viewBox="10 10 340 280" className="w-full">
          {nigeriaStates.map((state) => {
            const pos = statePositions[state.code];
            if (!pos) return null;
            const burden = getStateBurden(state);
            return (
              <motion.g
                key={state.code}
                onMouseEnter={() => setHovered(state.code)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={Math.max(10, Math.sqrt(state.population / 400000) * 4)}
                  fill={getColor(burden)}
                  stroke="hsl(var(--card))"
                  strokeWidth="1.5"
                  opacity={hovered && hovered !== state.code ? 0.4 : 0.85}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none fill-foreground text-[7px] font-medium"
                >
                  {state.code}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredState && (
          <div className="absolute right-2 top-2 rounded-lg border bg-card p-3 shadow-lg text-xs space-y-1 z-10">
            <div className="font-semibold">{hoveredState.name} State</div>
            <div className="text-muted-foreground">Zone: {hoveredState.zone}</div>
            <div>Cases: {(hoveredState.population * getStateBurden(hoveredState) * 0.058).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div>Test Positivity: {(42.7 * getStateBurden(hoveredState)).toFixed(1)}%</div>
            <div>Products Auth'd: {(hoveredState.population * 0.013).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
          {[
            { label: "Low", color: "hsl(50 90% 70%)" },
            { label: "Moderate", color: "hsl(45 90% 55%)" },
            { label: "High", color: "hsl(25 80% 55%)" },
            { label: "Very High", color: "hsl(0 70% 50%)" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
