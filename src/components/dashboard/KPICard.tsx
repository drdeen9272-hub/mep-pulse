import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  trend?: { value: string; positive: boolean };
  subtitle?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function KPICard({ title, value, trend, subtitle, icon, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-heading text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
        )}
      </div>
      {(trend || subtitle) && (
        <div className="mt-2 flex items-center gap-2 text-xs">
          {trend && (
            <span className={cn("flex items-center gap-0.5 font-medium", trend.positive ? "text-success" : "text-destructive")}>
              {trend.positive ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
              {trend.value}
            </span>
          )}
          {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
        </div>
      )}
    </motion.div>
  );
}
