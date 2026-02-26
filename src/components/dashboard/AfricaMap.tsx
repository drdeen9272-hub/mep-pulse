import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { africanCountries, countryPositions, getBurdenColor, type AfricanCountry } from "@/data/africaData";

export default function AfricaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const hoveredCountry = africanCountries.find(c => c.code === hovered);

  const handleClick = (country: AfricanCountry) => {
    if (country.code === "NG") {
      navigate("/dashboard");
    } else {
      navigate(`/dashboard/country/${country.code}`);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <h3 className="mb-3 font-heading text-sm font-semibold">Malaria Burden Across Africa</h3>
      <p className="mb-3 text-xs text-muted-foreground">Click a country to drill down. Bubble size reflects case burden.</p>

      <div className="relative">
        <svg viewBox="0 0 500 550" className="w-full h-auto">
          {/* Background shape hint */}
          <rect x="0" y="0" width="500" height="550" fill="transparent" />

          {/* Country bubbles */}
          {africanCountries.map(country => {
            const pos = countryPositions[country.code];
            if (!pos) return null;
            const isHovered = hovered === country.code;
            const radius = Math.max(6, Math.min(22, Math.sqrt(country.estimatedCases / 200)));

            return (
              <g
                key={country.code}
                onMouseEnter={() => setHovered(country.code)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(country)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius}
                  fill={getBurdenColor(country.incidencePerThousand)}
                  opacity={isHovered ? 0.95 : 0.7}
                  stroke={isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.2)"}
                  strokeWidth={isHovered ? 2 : 0.5}
                  style={{ transition: "all 0.15s ease" }}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: isHovered ? "7px" : "5px",
                    fontWeight: isHovered ? 700 : 600,
                    fill: "hsl(var(--foreground))",
                    transition: "all 0.15s ease",
                  }}
                >
                  {country.code.replace("_", "")}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-2 top-2 z-10 rounded-lg border bg-card/95 p-3 shadow-lg backdrop-blur-sm text-xs space-y-1"
            >
              <div className="font-semibold">{hoveredCountry.flag} {hoveredCountry.name}</div>
              <div className="text-muted-foreground">{hoveredCountry.region}</div>
              <div>Cases: {hoveredCountry.estimatedCases.toLocaleString()}K</div>
              <div>Deaths: {hoveredCountry.estimatedDeaths.toLocaleString()}</div>
              <div>Incidence: {hoveredCountry.incidencePerThousand}/1,000</div>
              <div>Phase: <span className="capitalize">{hoveredCountry.eliminationPhase}</span></div>
              <div className="text-[10px] text-muted-foreground pt-1">Click to view details →</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-2 text-center">
        <p className="text-[10px] font-medium text-muted-foreground mb-1">Incidence per 1,000 population</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground">
          {[
            { label: "<10", color: "hsl(140 60% 50%)" },
            { label: "10–49", color: "hsl(50 90% 75%)" },
            { label: "50–99", color: "hsl(45 90% 60%)" },
            { label: "100–199", color: "hsl(35 85% 55%)" },
            { label: "200–299", color: "hsl(25 80% 50%)" },
            { label: "300+", color: "hsl(0 70% 50%)" },
          ].map(l => (
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
