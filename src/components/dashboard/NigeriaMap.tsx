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
            const burden = getStateBurden(state);
            return (
              <circle
                key={state.code}
                cx={pos.x}
                cy={pos.y}
                r={14}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHovered(state.code)}
                onMouseLeave={() => setHovered(null)}
              />
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

// Adjusted positions to align with the real map image (viewBox 0 0 450 420)
const statePositions: Record<string, { x: number; y: number }> = {
  SO: { x: 115, y: 42 }, KB: { x: 70, y: 75 }, ZA: { x: 140, y: 75 },
  KT: { x: 195, y: 55 }, KN: { x: 240, y: 75 }, JG: { x: 285, y: 55 },
  YO: { x: 340, y: 55 }, BO: { x: 395, y: 65 },
  KD: { x: 200, y: 125 }, BA: { x: 300, y: 115 }, GO: { x: 340, y: 120 },
  AD: { x: 390, y: 135 }, TA: { x: 350, y: 165 },
  NI: { x: 148, y: 155 }, FC: { x: 210, y: 175 }, NA: { x: 255, y: 175 },
  PL: { x: 290, y: 160 }, BE: { x: 270, y: 200 },
  KW: { x: 125, y: 205 }, KG: { x: 190, y: 230 },
  OY: { x: 85, y: 240 }, OS: { x: 108, y: 265 }, EK: { x: 130, y: 275 },
  OG: { x: 65, y: 270 }, LA: { x: 48, y: 295 }, ON: { x: 135, y: 300 },
  ED: { x: 175, y: 285 }, DE: { x: 165, y: 320 },
  AN: { x: 210, y: 295 }, EN: { x: 245, y: 275 }, EB: { x: 270, y: 265 },
  IM: { x: 218, y: 320 }, AB: { x: 240, y: 330 },
  CR: { x: 305, y: 295 }, AK: { x: 278, y: 335 },
  RI: { x: 200, y: 355 }, BY: { x: 175, y: 370 },
};
