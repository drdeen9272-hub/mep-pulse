import { useState } from "react";
import { motion } from "framer-motion";
import { nigeriaStates, getStateBurden } from "@/data/nigeriaData";
import nigeriaMapImg from "@/assets/nigeria-map.png";

export default function NigeriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredState = nigeriaStates.find((s) => s.code === hovered);

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-3 font-heading text-sm font-semibold">Malaria Incidence by State</h3>
      <div className="relative">
        <motion.img
          src={nigeriaMapImg}
          alt="Nigeria malaria incidence map showing state-by-state burden with color-coded percentages"
          className="w-full rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Interactive overlay hotspots */}
        <svg viewBox="0 0 450 420" className="absolute inset-0 h-full w-full">
          {nigeriaStates.map((state) => {
            const pos = statePositions[state.code];
            if (!pos) return null;
            const isHovered = hovered === state.code;
            return (
              <g
                key={state.code}
                onMouseEnter={() => setHovered(state.code)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={14}
                  fill={isHovered ? "hsl(var(--primary) / 0.25)" : "transparent"}
                  stroke={isHovered ? "hsl(var(--primary))" : "transparent"}
                  strokeWidth="1.5"
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none font-semibold"
                  style={{
                    fontSize: isHovered ? "8px" : "6px",
                    fill: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.7)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {state.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-2 top-2 rounded-lg border bg-card/95 backdrop-blur-sm p-3 shadow-lg text-xs space-y-1 z-10"
          >
            <div className="font-semibold">{hoveredState.name} State</div>
            <div className="text-muted-foreground">Zone: {hoveredState.zone}</div>
            <div>Cases: {(hoveredState.population * getStateBurden(hoveredState) * 0.058).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div>Test Positivity: {(42.7 * getStateBurden(hoveredState)).toFixed(1)}%</div>
            <div>Products Auth'd: {(hoveredState.population * 0.013).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
        {[
          { label: "23–30%", color: "hsl(50 90% 75%)" },
          { label: "31–40%", color: "hsl(45 90% 60%)" },
          { label: "41–55%", color: "hsl(35 85% 55%)" },
          { label: "56–75%", color: "hsl(25 80% 50%)" },
          { label: "76–90%", color: "hsl(0 70% 50%)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// Positions calibrated to the uploaded Nigeria map image (viewBox 0 0 450 420)
const statePositions: Record<string, { x: number; y: number }> = {
  // North-West
  SO: { x: 112, y: 38 }, KB: { x: 62, y: 82 }, ZA: { x: 142, y: 68 },
  KT: { x: 200, y: 48 }, KN: { x: 232, y: 82 }, JG: { x: 290, y: 48 },
  KD: { x: 195, y: 128 },
  // North-East
  YO: { x: 345, y: 48 }, BO: { x: 400, y: 62 },
  BA: { x: 298, y: 108 }, GO: { x: 340, y: 110 },
  AD: { x: 395, y: 130 }, TA: { x: 355, y: 168 },
  // North-Central
  NI: { x: 138, y: 142 }, FC: { x: 208, y: 172 }, NA: { x: 252, y: 172 },
  PL: { x: 288, y: 155 }, BE: { x: 282, y: 205 },
  KW: { x: 118, y: 200 }, KG: { x: 185, y: 228 },
  // South-West
  OY: { x: 82, y: 235 }, OS: { x: 102, y: 262 }, EK: { x: 128, y: 268 },
  OG: { x: 60, y: 272 }, LA: { x: 40, y: 290 }, ON: { x: 130, y: 298 },
  // South-South
  ED: { x: 168, y: 280 }, DE: { x: 158, y: 318 },
  CR: { x: 300, y: 290 }, AK: { x: 272, y: 330 },
  RI: { x: 202, y: 348 }, BY: { x: 170, y: 360 },
  // South-East
  AN: { x: 205, y: 290 }, EN: { x: 238, y: 270 }, EB: { x: 268, y: 262 },
  IM: { x: 215, y: 318 }, AB: { x: 238, y: 325 },
};
