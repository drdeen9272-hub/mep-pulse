import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, Loader2, Pause, Play, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eliminationScore } from "@/data/misData";
import { nigeriaWMR2025 } from "@/data/wmr2025Data";

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/audio-briefing`;

function buildBriefingText() {
  const declining = eliminationScore.components.filter(c => c.trend === "declining");
  const improving = eliminationScore.components.filter(c => c.trend === "improving");

  return `Good day. Here is your Nigeria Malaria Elimination briefing.

The overall Elimination Tracking Score is ${eliminationScore.overall} out of 100. Nigeria accounts for ${nigeriaWMR2025.shareOfGlobalCases} percent of global malaria cases and ${nigeriaWMR2025.shareOfGlobalDeaths} percent of global malaria deaths.

${improving.length} indicators are improving: ${improving.map(c => `${c.label} at ${c.current} percent`).join(", ")}.

${declining.length > 0 ? `However, ${declining.length} indicators are declining: ${declining.map(c => `${c.label}, now at ${c.current} percent, down from previous surveys`).join(". ")}.` : ""}

Priority actions include strengthening ITN distribution in states showing declining ownership, scaling up diagnostic testing for febrile children, and sustaining the IPTp coverage gains.

This concludes your daily malaria elimination briefing.`;
}

export default function AudioBriefing() {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const generateAndPlay = async () => {
    if (audioUrl && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play();
        setPlaying(true);
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resp = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text: buildBriefingText() }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `TTS failed (${resp.status})`);
      }

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      audio.play();
      setPlaying(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm"
    >
      <Button
        onClick={generateAndPlay}
        disabled={loading}
        size="icon"
        variant={playing ? "secondary" : "default"}
        className="h-12 w-12 rounded-full flex-shrink-0"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : playing ? (
          <Pause className="h-5 w-5" />
        ) : audioUrl ? (
          <Play className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>
      <div className="flex-1">
        <h3 className="font-heading text-sm font-semibold flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-primary" />
          Daily Audio Briefing
        </h3>
        <p className="text-xs text-muted-foreground">
          {loading ? "Generating voice briefing..." : playing ? "Playing briefing..." : error ? error : "AI-narrated summary of current elimination status"}
        </p>
      </div>
      {audioUrl && !playing && (
        <button onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; } setAudioUrl(null); setPlaying(false); }} className="text-xs text-muted-foreground hover:text-foreground">
          <VolumeX className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}
