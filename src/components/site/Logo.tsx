import { Heart } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Heart className="h-5 w-5 fill-current" strokeWidth={2.2} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight">SalingBantu</span>
        <span className="text-[10px] font-medium text-muted-foreground">Donasi Tepat Sasaran</span>
      </div>
    </div>
  );
}
