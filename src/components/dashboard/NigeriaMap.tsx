import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { nigeriaStates } from "@/data/nigeriaData";
import { stratificationBands, type TransmissionBand } from "@/data/wmr2025Data";
import nigeriaMapImg from "@/assets/nigeria-map.png";

const bandColorMap: Record<TransmissionBand, string> = {
  very_low:   "hsl(145 60% 45%)",
  low_b:      "hsl(145 40% 55%)",
  low_a:      "hsl(48 80% 55%)",
  moderate_b: "hsl(25 80% 55%)",
  moderate_a: "hsl(0 70% 50%)",
};

export default function NigeriaMap() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredState = nigeriaStates.find((s) => s.code === hovered);
  const hoveredBand = hoveredState
    ? stratificationBands.find((b) => b.key === hoveredState.transmissionBand)
    : null;

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-3 font-heading text-sm font-semibold">NMSP Transmission Stratification by State</h3>
      <div className="relative">
        <motion.img
          src={nigeriaMapImg}
          alt="Nigeria map showing malaria transmission stratification bands by state"
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
            const bandColor = bandColorMap[state.transmissionBand];
            return (
              <g
                key={state.code}
                onMouseEnter={() => setHovered(state.code)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/dashboard/state/${state.code}`)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isHovered ? 16 : 13}
                  fill={`${bandColor}${isHovered ? "60" : "35"}`}
                  stroke={isHovered ? bandColor : `${bandColor}80`}
                  strokeWidth={isHovered ? 2 : 1}
                  style={{ transition: "all 0.15s ease" }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none font-semibold"
                  style={{
                    fontSize: isHovered ? "7.5px" : "6px",
                    fill: isHovered ? bandColor : "hsl(var(--foreground) / 0.8)",
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
        {hoveredState && hoveredBand && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-2 top-2 rounded-lg border bg-card/95 backdrop-blur-sm p-3 shadow-lg text-xs space-y-1 z-10 min-w-[160px]"
          >
            <div className="font-semibold">{hoveredState.name} State</div>
            <div className="text-muted-foreground">{hoveredState.zone}</div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: bandColorMap[hoveredState.transmissionBand] }} />
              <span className="font-medium" style={{ color: bandColorMap[hoveredState.transmissionBand] }}>
                {hoveredBand.label}
              </span>
            </div>
            <div>Prevalence: <span className="font-semibold">{hoveredState.prevalence2025}%</span></div>
            <div className="text-muted-foreground">{hoveredBand.prevalenceRange} band</div>
            <div>Pop: {(hoveredState.population / 1_000_000).toFixed(1)}M · {hoveredState.lgaCount} LGAs</div>
          </motion.div>
        )}
      </div>

      {/* Legend — stratification bands */}
      <div className="mt-3">
        <p className="text-[10px] font-medium text-muted-foreground mb-1.5 text-center">NMSP 2026–2030 Transmission Bands (MIS 2025 Prevalence)</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
          {stratificationBands.map((band) => {
            const count = nigeriaStates.filter((s) => s.transmissionBand === band.key).length;
            return (
              <div key={band.key} className="flex items-center gap-1">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: band.color }} />
                <span>{band.label} ({band.prevalenceRange})</span>
                <span className="font-bold">[{count}]</span>
              </div>
            );
          })}
        </div>
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
