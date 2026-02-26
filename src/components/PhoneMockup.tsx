import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  scale?: "sm" | "md" | "lg";
}

export default function PhoneMockup({ children, className, scale = "md" }: PhoneMockupProps) {
  const sizes = {
    sm: "w-[200px] h-[410px]",
    md: "w-[280px] h-[572px]",
    lg: "w-[320px] h-[654px]",
  };

  return (
    <div
      className={cn(
        "relative mx-auto rounded-[40px] border-[6px] border-foreground/90 bg-card shadow-2xl",
        sizes[scale],
        className
      )}
    >
      {/* Dynamic island / notch */}
      <div className="absolute left-1/2 top-2 z-10 h-[22px] w-[80px] -translate-x-1/2 rounded-full bg-foreground/90" />

      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pb-1 pt-8 text-[10px] font-medium text-muted-foreground">
        <span>10:30</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[8px] w-[3px] rounded-sm bg-muted-foreground/60" style={{ height: `${4 + i * 2}px` }} />
            ))}
          </div>
          <span className="ml-1">5G</span>
          <div className="ml-1 h-[10px] w-[18px] rounded-sm border border-muted-foreground/60 p-[1px]">
            <div className="h-full w-[70%] rounded-[1px] bg-success" />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="h-[calc(100%-70px)] overflow-y-auto px-3 pb-6">
        {children}
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-foreground/30" />
    </div>
  );
}
