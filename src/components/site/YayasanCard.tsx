import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Package, Wallet } from "lucide-react";
import type { Yayasan } from "@/lib/dummy-data";

export function YayasanCard({ y, compact = false }: { y: Yayasan; compact?: boolean }) {
  const pct = Math.round((y.fulfilled / y.total) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
      <div className={`relative h-32 bg-gradient-to-br ${y.color}`}>
        <div className="absolute -bottom-6 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-base font-bold text-foreground shadow-soft ring-4 ring-card">
          {y.initials}
        </div>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground/80 backdrop-blur">
          <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--color-trust)]" fill="currentColor" />
          Terverifikasi
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-9">
        <h3 className="text-[15px] font-bold leading-snug">{y.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {y.city} · {y.category}
        </p>
        {!compact && (
          <p className="mt-3 line-clamp-2 text-sm text-foreground/70">{y.description}</p>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground/80">
              {y.fulfilled} dari {y.total} kebutuhan terpenuhi
            </span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mint-soft">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {compact ? (
          <Button asChild variant="outline" className="mt-4 w-full rounded-lg border-primary/30 text-primary hover:bg-accent">
            <Link to="/yayasan/$slug" params={{ slug: y.slug }}>Lihat Wishlist</Link>
          </Button>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="rounded-lg border-primary/30 text-primary hover:bg-accent">
              <Link to="/yayasan/$slug" params={{ slug: y.slug }}>
                <Package className="h-4 w-4" /> Donasi Barang
              </Link>
            </Button>
            <Button asChild className="rounded-lg">
              <Link to="/yayasan/$slug" params={{ slug: y.slug }}>
                <Wallet className="h-4 w-4" /> Donasi Uang
              </Link>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
