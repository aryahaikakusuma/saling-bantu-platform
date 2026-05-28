import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { DonationModal, type DonationMode } from "@/components/site/DonationModal";
import { yayasans, wishlistItems, proofs, type WishlistItem } from "@/lib/dummy-data";
import {
  BadgeCheck,
  MapPin,
  CalendarDays,
  Wallet,
  Package,
  CheckCircle2,
  ArrowLeft,
  HandHeart,
} from "lucide-react";

export const Route = createFileRoute("/yayasan/$slug")({
  head: ({ params }) => {
    const y = yayasans.find((y) => y.slug === params.slug);
    return {
      meta: [
        { title: `${y?.name ?? "Yayasan"} — SalingBantu` },
        { name: "description", content: y?.description ?? "Wishlist kebutuhan yayasan." },
      ],
    };
  },
  loader: ({ params }) => {
    const y = yayasans.find((y) => y.slug === params.slug);
    if (!y) throw notFound();
    return { y };
  },
  component: YayasanDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">Yayasan tidak ditemukan.</div>
  ),
});

function YayasanDetail() {
  const { y } = Route.useLoaderData();
  const pct = Math.round((y.fulfilled / y.total) * 100);
  const [donation, setDonation] = useState<{ mode: DonationMode; item?: WishlistItem } | null>(null);

  const openDonation = (mode: DonationMode, item?: WishlistItem) => setDonation({ mode, item });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cover */}
      <div className={`relative h-56 bg-gradient-to-br ${y.color} sm:h-72`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/jelajah"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke jelajah
        </Link>

        {/* Identity card */}
        <div className="mt-2 -translate-y-8 rounded-3xl border border-border/60 bg-card p-5 shadow-soft sm:-translate-y-16 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br ${y.color} text-2xl font-bold ring-4 ring-card`}>
              {y.initials}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">{y.name}</h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--color-trust)]" fill="currentColor" />
                  Terverifikasi
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-foreground/70">
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {y.city}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> Berdiri {y.founded}</span>
                <span className="inline-flex items-center gap-1"><HandHeart className="h-4 w-4" /> {y.category}</span>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-foreground/80">{y.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-3">
            <Stat label="Total Donasi Diterima" value={y.totalDonations} />
            <Stat label="Kebutuhan Terpenuhi" value={`${y.fulfilled} / ${y.total}`} sub={`${pct}% wishlist`} />
            <Stat label="Aktif Sejak" value={`${new Date().getFullYear() - y.founded} tahun`} sub={`${y.founded}`} />
          </div>
        </div>

        {/* Wishlist */}
        <section className="-mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Wishlist Kebutuhan</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Pilih item yang ingin kamu bantu. Kirim barangnya langsung atau donasi uang.
              </p>
            </div>
            <Button onClick={() => openDonation("money")} className="rounded-lg">
              <Wallet className="h-4 w-4" /> Donasi Dana ke Yayasan
            </Button>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.name} item={item} onDonate={openDonation} />
            ))}
          </div>
        </section>

        {/* Proof of receipt */}
        <section className="mt-16">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Bukti Penerimaan Donasi</h2>
          </div>
          <p className="mt-1 text-sm text-foreground/70">
            Transparansi penuh — setiap donasi yang diterima dikonfirmasi oleh yayasan.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proofs.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                <div className={`flex h-40 items-center justify-center text-6xl bg-gradient-to-br ${yayasans[i % yayasans.length].color}`}>
                  {p.emoji}
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold">{p.item}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    dari <span className="font-medium text-foreground/80">{p.donor}</span> · {p.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

function WishlistCard({ item }: { item: (typeof wishlistItems)[number] }) {
  const done = item.fulfilled >= item.needed;
  const pct = Math.min(100, Math.round((item.fulfilled / item.needed) * 100));
  return (
    <article
      className={`flex gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft transition-all sm:gap-4 sm:p-5 ${
        done ? "opacity-60" : "hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl sm:h-16 sm:w-16 sm:text-3xl ${done ? "bg-mint-soft" : "bg-accent"}`}>
        {done ? <CheckCircle2 className="h-6 w-6 text-primary sm:h-7 sm:w-7" /> : item.emoji}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold leading-snug">{item.name}</h3>
            <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground/60">
              {item.category}
            </span>
          </div>
          {done && (
            <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10px] font-semibold text-primary">
              <CheckCircle2 className="h-3 w-3" /> Terpenuhi
            </span>
          )}
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-xs">
            <span className="text-foreground/70">
              <span className="font-semibold text-foreground">{item.fulfilled}</span> dari {item.needed} terpenuhi
            </span>
            <span className="font-semibold text-primary">{pct}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mint-soft">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {!done && (
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button variant="outline" size="sm" className="rounded-lg border-primary/30 text-primary hover:bg-accent">
              <Package className="h-4 w-4" /> Kirim Barang
            </Button>
            <Button size="sm" className="rounded-lg">
              <Wallet className="h-4 w-4" /> Donasi Dana
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
